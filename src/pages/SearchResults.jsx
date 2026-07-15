import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Grid, List } from 'lucide-react'
import HotelCard from '../components/HotelCard'
import FilterSidebar from '../components/FilterSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHotels, setFilters } from '../redux/hotelSlice'
import { mockApi } from '../services/api'

function SearchResults() {
  const [searchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { hotels, filters } = useSelector(state => state.hotels)

  useEffect(() => {
    const searchType = searchParams.get('city') || searchParams.get('type')
    const params = {
      city: searchParams.get('city') || filters.city,
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      guests: parseInt(searchParams.get('guests')) || filters.guests,
    }
    dispatch(setFilters(params))

    const loadResults = async () => {
      setLoading(true)
      try {
        if (searchParams.toString()) {
          const data = await mockApi.searchHotels({ ...filters, ...params })
          setResults(data)
        } else {
          const data = await mockApi.searchHotels(filters)
          setResults(data)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadResults()
  }, [searchParams, dispatch])

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters))
  }

  const handleReset = () => {
    dispatch(setFilters({}))
    setResults([])
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Search Results</h1>
          <p className="text-slate-400">
            {results.length} hotel{results.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              resultCount={results.length}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400 text-sm">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo/20 text-indigo-light' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors hidden sm:block ${viewMode === 'list' ? 'bg-indigo/20 text-indigo-light' : 'text-slate-400 hover:bg-white/5'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-2 border-indigo/30 border-t-indigo rounded-full animate-spin" />
                  <p className="text-slate-400">Searching hotels...</p>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-navy-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Hotels Found</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Try adjusting your filters or search with different criteria to find available hotels.
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                {results.map((hotel, index) => (
                  <HotelCard key={hotel.id} hotel={hotel} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults

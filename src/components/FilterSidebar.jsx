import { useState, useEffect } from 'react'
import { Star, X, SlidersHorizontal } from 'lucide-react'

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: 10000 },
  { label: 'Under $200', min: 0, max: 200 },
  { label: '$200 - $400', min: 200, max: 400 },
  { label: '$400 - $600', min: 400, max: 600 },
  { label: '$600 - $800', min: 600, max: 800 },
  { label: '$800+', min: 800, max: 10000 },
]

const COMMON_AMENITIES = [
  'WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Airport Transfer',
  'Room Service', 'Beach Access', 'Ski Access', 'Business Center', 'Concierge',
  'Laundry', 'Valet Parking', 'Hot Tub', 'Sauna', 'Yoga Studio', 'Rooftop Bar', 'Fireplace',
]

const ROOM_TYPES = ['All', 'Deluxe Room', 'Suite', 'Villa', 'Bungalow', 'Penthouse', 'Chalet', 'Room']

function FilterSidebar({ filters, onFilterChange, onReset, resultCount = 0 }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAmenity = (amenity) => {
    const current = filters.amenities || []
    if (current.includes(amenity)) {
      onFilterChange({ amenities: current.filter(a => a !== amenity) })
    } else {
      onFilterChange({ amenities: [...current, amenity] })
    }
  }

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 glass rounded-xl flex items-center justify-center gap-2 text-white font-medium hover:bg-white/5 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} lg:block glass rounded-2xl p-6 h-fit sticky top-24 animate-fade-in`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Filters</h2>
          <button onClick={onReset} className="text-sm text-indigo-light hover:text-indigo transition-colors">
            Reset All
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Price Range</h3>
          <div className="flex flex-col gap-2">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => onFilterChange({ priceMin: range.min, priceMax: range.max })}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  filters.priceMin === range.min && filters.priceMax === range.max
                    ? 'bg-indigo/20 text-indigo-light border border-indigo/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Minimum Rating</h3>
          <div className="flex flex-col gap-2">
            {[4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange({ rating: filters.rating === rating ? 0 : rating })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  filters.rating === rating
                    ? 'bg-gold/20 text-gold border border-gold/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <div className="flex gap-0.5">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <span>& up</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {COMMON_AMENITIES.map((amenity) => {
              const isSelected = (filters.amenities || []).includes(amenity)
              return (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    isSelected
                      ? 'bg-indigo/20 text-indigo-light border-indigo/30'
                      : 'bg-navy/30 text-slate-400 border-white/5 hover:border-white/20 hover:text-slate-200'
                  }`}
                >
                  {amenity}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Room Type</h3>
          <div className="flex flex-col gap-2">
            {ROOM_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange({ roomType: filters.roomType === type ? '' : type })}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  filters.roomType === type
                    ? 'bg-indigo/20 text-indigo-light border border-indigo/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-sm text-slate-400">
            <span className="text-white font-semibold">{resultCount}</span> hotel{resultCount !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>
    </>
  )
}

export default FilterSidebar

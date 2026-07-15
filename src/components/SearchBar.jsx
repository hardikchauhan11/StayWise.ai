import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Calendar, Users, ArrowRight, Sparkles } from 'lucide-react'

function SearchBar({ variant = 'hero' }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [city, setCity] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    const c = searchParams.get('city') || ''
    const ci = searchParams.get('checkIn') || ''
    const co = searchParams.get('checkOut') || ''
    const g = parseInt(searchParams.get('guests')) || 1
    setCity(c)
    setCheckIn(ci)
    setCheckOut(co)
    setGuests(g)
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (guests > 1) params.set('guests', guests.toString())
    navigate(`/search?${params.toString()}`)
  }

  if (variant === 'hero') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Where are you going?"
                className="w-full pl-12 pr-4 py-4 bg-navy/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-4 bg-navy/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full pl-12 pr-4 py-4 bg-navy/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full pl-12 pr-4 py-4 bg-navy/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n} className="bg-navy text-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-indigo to-indigo-dark hover:from-indigo-light hover:to-indigo text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo/25 hover:shadow-indigo/40 hover:-translate-y-0.5"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Sparkles className="w-4 h-4 text-gold" />
          <p className="text-slate-400 text-sm">
            <span className="text-white font-medium">AI-Powered</span> hotel recommendations tailored to your preferences
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-navy-dark/80 border border-white/10 rounded-xl p-4 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-light" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City or destination"
              className="w-full pl-10 pr-4 py-3 bg-navy border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-light" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-navy border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-light" />
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 bg-navy border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all text-sm appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n} className="bg-navy text-white">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo hover:bg-indigo-dark text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
          >
            <Search className="w-4 h-4" />
            Search
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar

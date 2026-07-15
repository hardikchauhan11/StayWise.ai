import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Star, MapPin, Heart, Share2, ArrowLeft, Wifi, Waves, Dumbbell, Sparkles, Wine, Bell, Users, Bed, Maximize, ChevronRight, Globe, Headphones, Zap, Activity, Check, Grid } from 'lucide-react'
import { mockHotels, mockRooms } from '../data/mockData'

const amenityIconMap = {
  'WiFi': Wifi, 'Pool': Waves, 'Spa': Sparkles, 'Gym': Dumbbell,
  'Restaurant': Wine, 'Bar': Wine, 'Room Service': Bell, 'Beach Access': Waves,
  'Infinity Pool': Waves, 'Concierge': Users, 'Butler Service': Users,
  'Private Pool': Waves, 'Sauna': Sparkles, 'Yoga Studio': Sparkles,
  'Hot Tub': Sparkles, 'Fireplace': Sparkles, 'Ski Storage': Maximize,
  'Airport Transfer': Globe, 'Business Center': Activity, 'Laundry': Bell,
  'Shuttle Service': Bell, 'Valet Parking': Maximize, 'Rooftop Lounge': Activity,
  'Mini Bar': Wine, 'Living Room': Users, 'Bathtub': Bed, 'Balcony': Maximize,
  'Ocean View': Waves, 'Mountain View': Maximize, 'Jacuzzi': Waves,
  'Terrace': Maximize, 'Garden': Sparkles, 'Private Terrace': Maximize,
  'Butler': Users, 'Dining Area': Wine, '24h Concierge': Users,
  'Rooftop Bar': Wine, 'Fitness Center': Dumbbell, 'Kitchenette': Wine,
  'Ski Access': Maximize, 'Water Sports': Waves, 'Snorkeling': Waves,
  'Cultural Shows': Sparkles, 'Heritage Tours': Globe, 'Massage': Sparkles,
  'City View': Maximize, 'Work Desk': Activity, 'Lounge Access': Users,
  'Private Gym': Dumbbell, 'Sun Deck': Maximize, 'Glass Floor': Activity,
  'Ocean Access': Waves, 'Beachfront': Waves, 'Outdoor Shower': Waves,
  'Caldera View': Waves,
}

function getAmenityIcon(amenity) {
  return amenityIconMap[amenity] || Check
}

function HotelDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [selectedRoomId, setSelectedRoomId] = useState(null)

  useEffect(() => {
    const loadHotel = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 300))
        const hotelData = mockHotels.find(h => h.id === parseInt(id)) || mockHotels[0]
        const rooms = mockRooms.filter(r => r.hotelId === parseInt(id))
        setHotel({ ...hotelData, rooms })
      } catch (error) {
        console.error('Failed to load hotel:', error)
      } finally {
        setLoading(false)
      }
    }
    loadHotel()
  }, [id])

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId)
    navigate(`/booking/${hotel.id}?room=${roomId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-indigo/30 border-t-indigo rounded-full animate-spin" />
          <p className="text-slate-400">Loading hotel details...</p>
        </div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Hotel Not Found</h2>
          <p className="text-slate-400 mb-4">The hotel you're looking for doesn't exist.</p>
          <Link to="/search" className="px-6 py-3 bg-indigo text-white rounded-xl font-medium">
            Browse Hotels
          </Link>
        </div>
      </div>
    )
  }

  const rooms = hotel.rooms || mockRooms.filter(r => r.hotelId === hotel.id)
  const reviews = hotel.reviews || []
  const overallRating = hotel.rating || 0
  const images = hotel.images && hotel.images.length > 0 ? hotel.images : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800']
  const mainImage = images[0]
  const galleryImages = images.slice(1, 5)
  while (galleryImages.length < 4) {
    galleryImages.push('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800')
  }

  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))) : 1
  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0]
  const roomPrice = selectedRoom?.pricePerNight || hotel.pricePerNight || 0
  const serviceFee = Math.round(roomPrice * nights * 0.08)
  const total = roomPrice * nights + serviceFee

  const amenityCategories = {
    'Leisure': hotel.amenities?.filter(a => ['Pool', 'Spa', 'Gym', 'Infinity Pool', 'Sauna', 'Yoga Studio', 'Hot Tub', 'Beach Access', 'Private Pool', 'Water Sports', 'Snorkeling'].includes(a)) || [],
    'Dining': hotel.amenities?.filter(a => ['Restaurant', 'Bar', 'Room Service', 'Mini Bar', 'Kitchenette', 'Underwater Bar', '24h Room Service'].includes(a)) || [],
    'Business': hotel.amenities?.filter(a => ['WiFi', 'Business Center', '24h Concierge', 'Concierge', 'Meeting Room', 'Rooftop Lounge', 'Lounge Access', 'Private Meeting Pods', 'High-Speed Starlink', 'Business Center'].includes(a)) || [],
    'Other': [],
  }

  const otherAmenities = hotel.amenities?.filter(a => {
    const allCategorized = [...amenityCategories.Leisure, ...amenityCategories.Dining, ...amenityCategories.Business]
    return !allCategorized.includes(a)
  }) || []
  if (otherAmenities.length > 0) {
    amenityCategories['Other'] = otherAmenities
  }

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200">
        <div className="flex justify-between items-center h-20 px-4 sm:px-8 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-slate-900 tracking-tight">staywise.ai</Link>
            <nav className="hidden md:flex gap-8">
              <Link to="/search" className="text-slate-900 border-b-2 border-slate-900 pb-1 text-sm font-semibold">Stays</Link>
              <span className="text-slate-400 text-sm font-medium cursor-pointer">Resorts</span>
              <span className="text-slate-400 text-sm font-medium cursor-pointer">Management</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-slate-500">
              <Globe className="w-5 h-5 cursor-pointer hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-all" />
              <Headphones className="w-5 h-5 cursor-pointer hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-all" />
            </div>
            <Link to="/admin/login" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all">Login / Signup</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/search" className="hover:text-slate-900 transition-colors">Luxury Resorts</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-bold">{hotel.name}</span>
        </nav>

        {/* Image Gallery Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[500px] mb-10 rounded-2xl overflow-hidden">
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all z-10" />
            <img
              src={mainImage}
              alt={hotel.name}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <button className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur text-slate-900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg">
              <Grid className="w-4 h-4" />
              View {images.length} Photos
            </button>
          </div>
          {galleryImages.slice(0, 4).map((img, index) => (
            <div key={index} className="hidden md:block relative group overflow-hidden">
              <img
                src={img}
                alt={`${hotel.name} ${index + 2}`}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Property Overview */}
            <section>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{hotel.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-600 text-base">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">{overallRating}</span>
                      <span>({reviews.length} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                    <Share2 className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2.5 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">
                    <Heart className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="text-slate-600 text-base leading-relaxed space-y-4">
                <p>{hotel.description}</p>
              </div>

              <div className="mt-8 rounded-2xl overflow-hidden h-64 relative border border-slate-200">
                <img
                  src={mainImage}
                  alt={hotel.location}
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-slate-200">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-slate-900">Exact location provided after booking</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Room Options */}
            <section id="rooms" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Available Rooms</h2>
              <div className="space-y-6">
                {rooms.map((room, index) => {
                  const badges = ['Best Value', 'Popular', 'Premium']
                  const badge = badges[index % badges.length]
                  const badgeColors = {
                    'Best Value': 'bg-emerald-50 text-emerald-700',
                    'Popular': 'bg-indigo-50 text-indigo-700',
                    'Premium': 'bg-amber-50 text-amber-700',
                  }
                  return (
                    <div key={room.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 grid md:grid-cols-5">
                      <div className="md:col-span-2 h-48 md:h-auto overflow-hidden">
                        <img
                          src={room.images?.[0] || hotel.thumbnail || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800'}
                          alt={room.name}
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800' }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:col-span-3 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-slate-900">{room.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColors[badge]}`}>{badge}</span>
                          </div>
                          <ul className="flex flex-wrap gap-4 mb-6">
                            <li className="flex items-center gap-1.5 text-slate-600 text-sm">
                              <Maximize className="w-4 h-4 text-slate-400" />
                              {room.size || 45}m²
                            </li>
                            <li className="flex items-center gap-1.5 text-slate-600 text-sm">
                              <Bed className="w-4 h-4 text-slate-400" />
                              1 King Bed
                            </li>
                            <li className="flex items-center gap-1.5 text-slate-600 text-sm">
                              <Wifi className="w-4 h-4 text-slate-400" />
                              Free WiFi
                            </li>
                            {(room.amenities || []).slice(0, 3).map((amenity) => {
                              const Icon = getAmenityIcon(amenity)
                              return (
                                <li key={amenity} className="flex items-center gap-1.5 text-slate-600 text-sm">
                                  <Icon className="w-4 h-4 text-slate-400" />
                                  {amenity}
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-2xl font-bold text-slate-900">${room.pricePerNight || hotel.pricePerNight}</span>
                            <span className="text-slate-500 text-sm ml-1">/ night</span>
                          </div>
                          <button
                            onClick={() => handleSelectRoom(room.id)}
                            className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95"
                          >
                            Select Room
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Amenities */}
            <section className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Premium Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Object.entries(amenityCategories).map(([category, amenities]) => {
                  if (amenities.length === 0) return null
                  return (
                    <div key={category} className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{category}</h4>
                      <div className="space-y-3">
                        {amenities.map((amenity) => {
                          const Icon = getAmenityIcon(amenity)
                          return (
                            <div key={amenity} className="flex items-center gap-3 text-slate-600 text-sm">
                              <Icon className="w-5 h-5 text-indigo-600" />
                              {amenity}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Guest Experiences</h2>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200">
                  <span className="text-2xl font-bold text-slate-900">{overallRating}</span>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.slice(0, 4).map((review, index) => (
                  <div key={index} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {review.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 text-sm">{review.user}</h5>
                        <p className="text-xs text-slate-500">{review.date} • Verified Trip</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 italic leading-relaxed">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="relative">
            <aside className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-bold text-slate-900">${roomPrice}</span>
                  <span className="text-slate-500 text-sm mb-1.5">/ night</span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-2 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-3 border-r border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                      <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="text-sm font-medium bg-transparent border-none outline-none text-slate-900 w-full"
                      />
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                      <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="text-sm font-medium bg-transparent border-none outline-none text-slate-900 w-full"
                      />
                    </div>
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                    <label className="block text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="text-sm font-medium bg-transparent border-none outline-none text-slate-900 w-full cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectRoom(selectedRoom?.id || rooms[0]?.id)}
                  className="w-full bg-orange-600 text-white py-4 rounded-full font-bold hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all mb-4"
                >
                  Reserve Now
                </button>
                <p className="text-center text-xs text-slate-500 mb-6">You won't be charged yet</p>
                <div className="space-y-3 border-t border-slate-200 pt-6">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>${roomPrice} x {nights} night{nights > 1 ? 's' : ''}</span>
                    <span>${roomPrice * nights}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Service fee</span>
                    <span>${serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-slate-200">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              {/* AI recommendation card */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Staywise Insight</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">Best Price Guaranteed</h4>
                  <p className="text-sm text-white/80">Prices for these dates are 15% lower than the seasonal average. Booking now is recommended.</p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10">
                  <Activity className="w-32 h-32" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 mt-20 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-8 py-16 w-full max-w-7xl mx-auto text-white">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-6">staywise.ai</h2>
            <p className="text-sm text-slate-400 max-w-xs">Intelligent resort management and premium booking experiences, powered by modern interface principles.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-amber-400">Product</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/search" className="text-slate-300 hover:text-white transition-colors text-sm">Stays</Link>
              <span className="text-slate-300 text-sm cursor-pointer">Resorts</span>
              <span className="text-slate-300 text-sm cursor-pointer">Management</span>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-amber-400">Company</h4>
            <nav className="flex flex-col gap-4">
              <span className="text-slate-300 text-sm cursor-pointer">About Us</span>
              <span className="text-slate-300 text-sm cursor-pointer">Careers</span>
              <span className="text-slate-300 text-sm cursor-pointer">Partner with Us</span>
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-6 uppercase tracking-widest text-amber-400">Support</h4>
            <nav className="flex flex-col gap-4">
              <span className="text-slate-300 text-sm cursor-pointer">Contact Support</span>
              <span className="text-slate-300 text-sm cursor-pointer">Terms of Service</span>
              <span className="text-slate-300 text-sm cursor-pointer">Privacy Policy</span>
            </nav>
          </div>
        </div>
        <div className="px-4 sm:px-8 py-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">© 2024 staywise.ai. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Sticky Book Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-[60] flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-2xl font-bold text-slate-900">${roomPrice}</span>
          <span className="text-xs text-slate-500">/ night</span>
        </div>
        <button
          onClick={() => handleSelectRoom(selectedRoom?.id || rooms[0]?.id)}
          className="bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg"
        >
          Check Availability
        </button>
      </div>
    </div>
  )
}

export default HotelDetails

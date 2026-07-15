import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Star, MapPin, Calendar, Users, CreditCard, CheckCircle, Download, Share2, Heart } from 'lucide-react'
import { mockHotels } from '../data/mockData'
import { formatPrice } from '../utils/currency'

function Confirmation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [booking, setBooking] = useState(null)

  useEffect(() => {
    const state = location.state || window.history.state?.usr
    if (!state?.booking) {
      navigate('/search')
      return
    }
    setBooking(state.booking)
  }, [navigate, location])

  if (!booking) return null

  const hotel = mockHotels.find(h => h.id === booking.hotelId) || mockHotels[0]
  const confirmationNumber = `SW-${Date.now().toString(36).toUpperCase()}`

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8 animate-slide-up">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-slate-400">Your reservation has been successfully completed</p>
        </div>

        <div className="glass rounded-2xl p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-slate-400 text-sm">Confirmation Number</p>
              <p className="text-white font-mono text-xl font-bold">{confirmationNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Booking Date</p>
              <p className="text-white">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/3 relative rounded-xl overflow-hidden">
              <img
                src={booking.roomImage || hotel.thumbnail || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
                alt={hotel.name}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }}
                className="w-full h-48 md:h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">{hotel.name}</h2>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                <MapPin className="w-4 h-4 text-indigo-light" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(hotel.rating ? Math.floor(hotel.rating) : 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
                <span className="text-sm text-slate-400 ml-1">{hotel.rating || 5.0}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-indigo-light" />
                  <span>{booking.checkIn} to {booking.checkOut}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="w-4 h-4 text-indigo-light" />
                  <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CreditCard className="w-4 h-4 text-indigo-light" />
                  <span>{booking.roomName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-navy/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-xs mb-1">Nights</p>
              <p className="text-white font-bold text-lg">{booking.nights || 1}</p>
            </div>
            <div className="bg-navy/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-xs mb-1">Guests</p>
              <p className="text-white font-bold text-lg">{booking.guests}</p>
            </div>
            <div className="bg-navy/50 rounded-xl p-4 text-center">
              <p className="text-slate-400 text-xs mb-1">Room</p>
              <p className="text-white font-bold text-lg">{booking.roomName}</p>
            </div>
          </div>

          <div className="bg-navy/50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Base Price</span>
              <span className="text-slate-300">{formatPrice(booking.basePrice, booking.currency || 'USD')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Taxes</span>
              <span className="text-slate-300">{formatPrice(booking.taxes, booking.currency || 'USD')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Service Fee</span>
              <span className="text-slate-300">{formatPrice(booking.serviceFee, booking.currency || 'USD')}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <span className="text-white font-semibold">Total Paid</span>
               <span className="text-white font-bold text-xl">{formatPrice(booking.totalPrice, booking.currency || 'USD')}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button className="glass rounded-xl p-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-colors">
            <Download className="w-5 h-5" />
            <span className="text-sm font-medium">Download PDF</span>
          </button>
          <button className="glass rounded-xl p-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button className="glass rounded-xl p-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Save</span>
          </button>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-slate-400 text-sm mb-4">
            A confirmation email has been sent to your email address.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="px-8 py-3 bg-indigo hover:bg-indigo-dark text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-indigo/25"
          >
            Browse More Hotels
          </button>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

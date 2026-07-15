import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Calendar, Users, CreditCard, Shield, Check, Info } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setCurrentBooking } from '../redux/bookingSlice'
import { formatPrice, CURRENCIES } from '../utils/currency'

function BookingForm({ hotel, room, onClose, currency = 'USD', onCurrencyChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const params = new URLSearchParams(location.search)
  const [formData, setFormData] = useState({
    checkIn: params.get('checkIn') || '',
    checkOut: params.get('checkOut') || '',
    guests: parseInt(params.get('guests')) || 1,
    roomId: room?.id || '',
    specialRequests: '',
    currency: currency,
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const nightsCount = formData.checkIn && formData.checkOut ? (
    Math.max(1, Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)))
  ) : 1

  const basePrice = (room?.pricePerNight || hotel?.pricePerNight || 0) * nightsCount
  const taxes = Math.round(basePrice * 0.12)
  const serviceFee = Math.round(basePrice * 0.08)
  const grandTotal = basePrice + taxes + serviceFee

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value
    setFormData({ ...formData, currency: newCurrency })
    onCurrencyChange?.(newCurrency)
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required'
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required'
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn)
      const checkOutDate = new Date(formData.checkOut)
      if (checkInDate < new Date(new Date().setHours(0, 0, 0, 0))) {
        newErrors.checkIn = 'Check-in cannot be in the past'
      }
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = 'Check-out must be after check-in'
      }
    }
    if (!formData.roomId) newErrors.roomId = 'Please select a room'
    if (formData.guests < 1) newErrors.guests = 'At least 1 guest is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const booking = {
        hotelId: hotel.id,
        roomId: formData.roomId,
        hotelName: hotel.name,
        roomName: room?.name || 'Room',
        roomImage: room?.images?.[0] || hotel.thumbnail,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        nights: nightsCount,
        totalPrice: grandTotal,
        taxes,
        serviceFee,
        basePrice,
        currency: formData.currency,
        ...formData,
      }
      dispatch(setCurrentBooking(booking))
      navigate('/payment', { state: { booking } })
    } catch (error) {
      console.error('Booking error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const availableRooms = hotel.rooms?.filter(r => r.available !== false) || hotel.rooms || []

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Booking Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Check-in Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-3 bg-navy border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${errors.checkIn ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:ring-indigo'}`}
              />
            </div>
            {errors.checkIn && <p className="text-red-400 text-sm mt-1">{errors.checkIn}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Check-out Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-3 bg-navy border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${errors.checkOut ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:ring-indigo'}`}
              />
            </div>
            {errors.checkOut && <p className="text-red-400 text-sm mt-1">{errors.checkOut}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className={`w-full pl-10 pr-4 py-3 bg-navy border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${errors.guests ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:ring-indigo'}`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n} className="bg-navy text-white">{n} Guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Currency</label>
            <div className="relative">
              <select
                value={formData.currency}
                onChange={handleCurrencyChange}
                className={`w-full px-4 py-3 bg-navy border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer border-white/10 focus:ring-indigo`}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-navy text-white">
                    {c.symbol} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {availableRooms.length > 1 && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Room</label>
              <select
                value={formData.roomId}
                onChange={(e) => setFormData({ ...formData, roomId: parseInt(e.target.value) })}
                className={`w-full px-4 py-3 bg-navy border rounded-xl text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${errors.roomId ? 'border-red-400 focus:ring-red-400' : 'border-white/10 focus:ring-indigo'}`}
              >
                <option value="" className="bg-navy text-white">Select a room type</option>
                {availableRooms.map((r) => (
                  <option key={r.id} value={r.id} className="bg-navy text-white">
                    {r.name} - {formatPrice(r.pricePerNight, formData.currency)}/night
                  </option>
                ))}
              </select>
              {errors.roomId && <p className="text-red-400 text-sm mt-1">{errors.roomId}</p>}
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-300 mb-2">Special Requests (Optional)</label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="Any special requests or preferences..."
            rows={3}
            className="w-full px-4 py-3 bg-navy border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <img
            src={hotel.thumbnail || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
            alt={hotel.name}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-semibold text-white">{hotel.name}</h4>
            <p className="text-slate-400 text-sm">{(room?.name || 'Standard Room')}</p>
            <p className="text-slate-400 text-sm flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-indigo-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {hotel.location}
            </p>
          </div>
        </div>

          <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">
              {formatPrice(room?.pricePerNight || hotel.pricePerNight, formData.currency)} x {nightsCount} night{nightsCount > 1 ? 's' : ''}
            </span>
            <span className="text-slate-300">{formatPrice(basePrice, formData.currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Taxes (12%)</span>
            <span className="text-slate-300">{formatPrice(taxes, formData.currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Service Fee (8%)</span>
            <span className="text-slate-300">{formatPrice(serviceFee, formData.currency)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-white font-semibold text-lg">Total</span>
            <span className="text-white font-bold text-2xl">{formatPrice(grandTotal, formData.currency)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-sm mt-4 p-3 bg-navy/50 rounded-lg">
          <Info className="w-4 h-4 text-indigo-light flex-shrink-0" />
          <p>You can cancel free of charge up to 48 hours before check-in. No-shows will be charged for the first night.</p>
        </div>

        <button
          type="submit"
            disabled={isProcessing || availableRooms.length === 0}
          className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-indigo to-indigo-dark hover:from-indigo-light hover:to-indigo text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo/25 hover:shadow-indigo/40 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard className="w-5 h-5" />
          {isProcessing ? 'Processing...' : `Pay ${formatPrice(grandTotal, formData.currency)}`}
        </button>

        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Check className="w-4 h-4 text-green-400" />
            <span>Free Cancellation</span>
          </div>
        </div>
      </div>
    </form>
  )
}

export default BookingForm

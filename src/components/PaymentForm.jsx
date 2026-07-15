import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreditCard, Lock, Check, Shield, Smartphone, Wallet } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { createBooking, clearBooking } from '../redux/bookingSlice'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/currency'

const PAYMENT_METHODS = [
  { id: 'credit_card', name: 'Credit/Debit Card', icon: CreditCard },
  { id: 'razorpay', name: 'Razorpay', icon: Smartphone },
  { id: 'stripe', name: 'Stripe', icon: Wallet },
]

function PaymentForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState('credit_card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  })

  const booking = location.state?.booking || null

  if (!booking) {
    navigate('/search')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newBooking = {
        hotelId: booking.hotelId,
        roomId: booking.roomId,
        userId: user?.id || 'guest',
        userName: user?.name || 'Guest User',
        userEmail: user?.email || 'guest@example.com',
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        status: 'confirmed',
        paymentMethod: selectedMethod,
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
        ...booking,
      }

      dispatch(createBooking(newBooking))
      navigate('/confirmation', { state: { booking: newBooking } })
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCardChange = (field, value) => {
    let formatted = value
    if (field === 'number') {
      formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    } else if (field === 'expiry') {
      formatted = value.replace(/\D/g, '').replace(/^(\d{2})(\d{0,2})/, '$1/$2').slice(0, 5)
    } else if (field === 'cvv') {
      formatted = value.replace(/\D/g, '').slice(0, 4)
    }
    setCardDetails({ ...cardDetails, [field]: formatted })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Payment Method</h2>
        <p className="text-slate-400 text-sm">Choose how you'd like to pay</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {PAYMENT_METHODS.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === method.id
                    ? 'border-indigo bg-indigo/10 text-indigo-light'
                    : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-slate-200'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{method.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {selectedMethod === 'credit_card' && (
        <div className="glass rounded-2xl p-6 mb-6 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-4">Card Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Cardholder Name</label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => handleCardChange('name', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-navy border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Card Number</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-light" />
                <input
                  type="text"
                  value={cardDetails.number}
                  onChange={(e) => handleCardChange('number', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-12 pr-4 py-3 bg-navy border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Expiry Date</label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardChange('expiry', e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 bg-navy border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CVV</label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardChange('cvv', e.target.value)}
                  placeholder="***"
                  className="w-full px-4 py-3 bg-navy border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full px-6 py-4 bg-gradient-to-r from-indigo to-indigo-dark hover:from-indigo-light hover:to-indigo text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo/25 hover:shadow-indigo/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Pay {formatPrice(booking.totalPrice, booking.currency || 'USD')}
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {(selectedMethod === 'razorpay' || selectedMethod === 'stripe') && (
        <div className="glass rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-indigo/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-indigo-light" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Pay with {selectedMethod === 'razorpay' ? 'Razorpay' : 'Stripe'}</h3>
            <p className="text-slate-400 text-sm mb-6">
              You'll be redirected to {selectedMethod === 'razorpay' ? 'Razorpay' : 'Stripe'} to complete your payment securely.
            </p>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-indigo to-indigo-dark text-white rounded-xl font-semibold flex items-center justify-center gap-2 mx-auto transition-all hover:shadow-lg hover:shadow-indigo/25 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : `Pay ${formatPrice(booking.totalPrice, booking.currency || 'USD')}`}
            </button>
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Booking Summary</h3>
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
          <img
            src={booking.roomImage || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
            alt={booking.hotelName}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-semibold text-white text-sm">{booking.hotelName}</h4>
            <p className="text-slate-400 text-xs">{booking.roomName}</p>
            <p className="text-slate-400 text-xs">{booking.checkIn} to {booking.checkOut}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400">Total Amount</span>
          <span className="text-white font-bold text-xl">{formatPrice(booking.totalPrice, booking.currency || 'USD')}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-6">
        <Shield className="w-4 h-4" />
        <span>256-bit SSL encrypted payment</span>
      </div>
    </div>
  )
}

export default PaymentForm

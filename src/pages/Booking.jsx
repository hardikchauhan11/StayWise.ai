import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Hotel, Calendar, Users, Check } from 'lucide-react'
import BookingForm from '../components/BookingForm'
import { mockHotels, mockRooms } from '../data/mockData'

function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [step, setStep] = useState(1)
  const [currency, setCurrency] = useState('USD')

  useEffect(() => {
    const roomId = window.location.search.includes('room=')
      ? parseInt(new URLSearchParams(window.location.search).get('room'))
      : null

    const hotelData = mockHotels.find(h => h.id === parseInt(id)) || mockHotels[0]
    const rooms = mockRooms.filter(r => r.hotelId === parseInt(id))
    setHotel({ ...hotelData, rooms })

    if (roomId) {
      const room = rooms.find(r => r.id === roomId)
      setSelectedRoom(room)
      setStep(2)
    }
  }, [id])

  const steps = [
    { number: 1, label: 'Select Room', icon: Hotel },
    { number: 2, label: 'Guest Details', icon: Users },
    { number: 3, label: 'Confirm & Pay', icon: Calendar },
  ]

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Hotel
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Complete Your Booking</h1>
          <p className="text-slate-400">
            {hotel?.name}
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s.number
                    ? 'bg-indigo border-indigo text-white'
                    : 'border-white/20 text-slate-500'
                }`}>
                  {step > s.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 ${step >= s.number ? 'text-indigo-light' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 transition-all ${step > s.number ? 'bg-indigo' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

      {hotel && (
        <BookingForm hotel={hotel} room={selectedRoom} currency={currency} onCurrencyChange={handleCurrencyChange} />
      )}
      </div>
    </div>
  )
}

export default Booking

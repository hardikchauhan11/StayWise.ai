import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookings, updateBookingStatus } from '../redux/bookingSlice'
import { Eye, X, Check, XCircle } from 'lucide-react'
import { getStatusColor } from '../utils/helpers'

function AdminBookings() {
  const dispatch = useDispatch()
  const { bookings } = useSelector(state => state.bookings)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)

  useEffect(() => {
    dispatch(fetchBookings())
  }, [dispatch])

  const filteredBookings = bookings.filter(b => {
    if (filter !== 'all' && b.status !== filter) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        b.hotelName?.toLowerCase().includes(term) ||
        b.userName?.toLowerCase().includes(term) ||
        b.userEmail?.toLowerCase().includes(term) ||
        b.id.toString().includes(term)
      )
    }
    return true
  })

  const handleStatusUpdate = async (id, status) => {
    await dispatch(updateBookingStatus({ id, status }))
    setSelectedBooking(null)
  }

  const statusCounts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Manage Bookings</h1>
        <p className="text-slate-400">{bookings.length} total bookings</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([key, count]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
              filter === key
                ? 'bg-indigo/20 text-indigo-light border border-indigo/30'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            {key === 'all' ? 'All Bookings' : key} ({count})
          </button>
        ))}
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings by name, email, or ID..."
              className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Booking ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Guests</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden sm:table-cell">Hotel</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Dates</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">#{booking.id}</p>
                    <p className="text-slate-400 text-sm sm:hidden">{booking.hotelName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-300 text-sm">{booking.userName}</p>
                    <p className="text-slate-500 text-xs">{booking.userEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300 hidden sm:table-cell">{booking.hotelName}</td>
                  <td className="px-6 py-4 text-slate-300 hidden md:table-cell">
                    <p className="text-sm">{booking.checkIn} - {booking.checkOut}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{booking.totalPrice}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedBooking(booking)} className="p-2 text-slate-400 hover:text-indigo-light transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedBooking(null)}>
          <div className="glass rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Booking Details</h3>
              <button onClick={() => setSelectedBooking(null)} className="p-2 text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Booking ID</span>
                <span className="text-white font-mono">#{selectedBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guest</span>
                <span className="text-white">{selectedBooking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email</span>
                <span className="text-white">{selectedBooking.userEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hotel</span>
                <span className="text-white">{selectedBooking.hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Check-in</span>
                <span className="text-white">{selectedBooking.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Check-out</span>
                <span className="text-white">{selectedBooking.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total</span>
                <span className="text-white font-bold">{selectedBooking.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment</span>
                <span className="text-white capitalize">{selectedBooking.paymentMethod || 'N/A'}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(selectedBooking.id, 'confirmed')}
                  className="flex-1 px-4 py-2.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-xl text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" /> Confirm
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedBooking.id, 'cancelled')}
                  className="flex-1 px-4 py-2.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBookings

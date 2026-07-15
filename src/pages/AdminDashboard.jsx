import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHotels } from '../redux/hotelSlice'
import HotelCard from '../components/HotelCard'
import DashboardCards from '../components/DashboardCards'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStatusColor } from '../utils/helpers'

const revenueData = [
  { month: 'Jan', revenue: 4200 },
  { month: 'Feb', revenue: 3800 },
  { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4600 },
  { month: 'May', revenue: 5800 },
  { month: 'Jun', revenue: 6800 },
]

function AdminDashboard() {
  const dispatch = useDispatch()
  const { hotels } = useSelector(state => state.hotels)
  const { bookings } = useSelector(state => state.bookings)
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalHotels: 0,
    occupancyRate: 78,
  })

  useEffect(() => {
    dispatch(fetchHotels())
  }, [dispatch])

  useEffect(() => {
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length
    setStats({
      totalRevenue,
      totalBookings: bookings.length,
      totalHotels: hotels.length,
      occupancyRate: 78,
    })
  }, [bookings, hotels])

  const recentBookings = bookings.slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-slate-400">Welcome back! Here's what's happening with your properties.</p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  labelStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No recent bookings</p>
            ) : (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-navy/50 rounded-xl">
                  <div>
                    <p className="text-white font-medium">{booking.hotelName}</p>
                    <p className="text-slate-400 text-sm">{booking.userName}</p>
                    <p className="text-slate-500 text-xs">{booking.checkIn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${booking.totalPrice}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

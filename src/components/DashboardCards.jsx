import { TrendingUp, TrendingDown, Hotel, Bed, CalendarCheck, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

function DashboardCards({ stats }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500/20 to-green-500/5',
      borderColor: 'border-green-500/20',
      textColor: 'text-green-400',
    },
    {
      title: 'Total Bookings',
      value: stats?.totalBookings?.toLocaleString() || '0',
      change: '+8.2%',
      trend: 'up',
      icon: CalendarCheck,
      color: 'from-indigo/20 to-indigo/5',
      borderColor: 'border-indigo/20',
      textColor: 'text-indigo-light',
    },
    {
      title: 'Active Hotels',
      value: stats?.totalHotels?.toLocaleString() || '0',
      change: '+2',
      trend: 'up',
      icon: Hotel,
      color: 'from-gold/20 to-gold/5',
      borderColor: 'border-gold/20',
      textColor: 'text-gold',
    },
    {
      title: 'Occupancy Rate',
      value: `${stats?.occupancyRate || '0'}%`,
      change: '+5.1%',
      trend: 'up',
      icon: Bed,
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`glass rounded-xl p-6 bg-gradient-to-br ${card.color} ${card.borderColor} border animate-slide-up opacity-0`}
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
              <card.icon className={`w-6 h-6 ${card.textColor}`} />
            </div>
            <div className={`flex items-center gap-1 text-sm ${card.textColor}`}>
              {card.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="font-semibold">{card.change}</span>
            </div>
          </div>
          <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
          <p className="text-white text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default DashboardCards

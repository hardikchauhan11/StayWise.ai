import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Wifi, Car, Coffee, Waves, Dumbbell, Users, Bed, Maximize } from 'lucide-react'

const amenityIcons = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: Coffee,
  Pool: Waves,
  Gym: Dumbbell,
  'Mini Bar': Users,
  'Living Room': Users,
  'Bathtub': Bed,
  'Balcony': Maximize,
  'Fireplace': Wifi,
  'Jacuzzi': Waves,
  'Private Pool': Waves,
  'Butler Service': Users,
}

function RoomCard({ room, hotelId, onSelect, selected = false, showActions = true }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative glass rounded-xl overflow-hidden transition-all duration-300 ${selected ? 'ring-2 ring-indigo shadow-lg shadow-indigo/20' : 'hover:shadow-xl hover:shadow-black/20'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row gap-0">
        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={Array.isArray(room.images) ? room.images[0] : (room.images || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800')}
            alt={room.name}
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800' }}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {selected && (
            <div className="absolute inset-0 bg-indigo/20 flex items-center justify-center">
              <span className="px-4 py-2 bg-indigo text-white rounded-full text-sm font-semibold">Selected</span>
            </div>
          )}
        </div>
        <div className="flex-1 p-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">{room.name}</h3>
              <p className="text-slate-400 text-sm mb-2">{room.description}</p>
              <div className="flex flex-wrap gap-3 text-sm text-slate-300 mb-3">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-indigo-light" />
                  {room.capacity} Guest{room.capacity > 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize className="w-4 h-4 text-indigo-light" />
                  {room.size} m²
                </span>
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4 text-indigo-light" />
                  1 Double Bed
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {room.amenities?.slice(0, 6).map((amenity) => {
                  const Icon = amenityIcons[amenity] || null
                  return (
                    <span key={amenity} className="px-2 py-1 bg-navy/50 border border-white/5 rounded-lg text-xs text-slate-300 flex items-center gap-1">
                      {Icon && <Icon className="w-3 h-3 text-indigo-light" />}
                      {amenity}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col items-end justify-between gap-3">
              <div className="text-right">
                <span className="text-2xl font-bold text-white">{room.pricePerNight}</span>
                <span className="text-slate-400 text-sm ml-1">/ night</span>
              </div>
              {showActions && (
                <Link
                  to={`/booking/${hotelId}?room=${room.id}`}
                  onClick={onSelect}
                  className="px-5 py-2.5 bg-indigo hover:bg-indigo-dark text-white rounded-lg font-medium text-center transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo/25"
                >
                  Select Room
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomCard

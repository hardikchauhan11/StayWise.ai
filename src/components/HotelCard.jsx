import { Link } from 'react-router-dom'
import { Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Heart, ArrowRight } from 'lucide-react'

const amenityIcons = {
  WiFi: Wifi,
  Parking: Car,
  Restaurant: Utensils,
  Pool: Waves,
  Gym: Dumbbell,
}

function HotelCard({ hotel, index = 0 }) {
  const displayRating = hotel.rating || 0
  const starRating = Math.floor(displayRating)
  const halfStar = displayRating % 1 >= 0.5 ? 1 : 0

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
  }

  return (
    <Link
      to={`/hotel/${hotel.id}`}
      className="group block glass rounded-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo/20 animate-slide-up opacity-0"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={hotel.thumbnail || (Array.isArray(hotel.images) ? hotel.images[0] : undefined) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'}
          alt={hotel.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        {hotel.isTrending && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gold/90 text-navy text-xs font-bold rounded-full">
            Trending
          </div>
        )}
        <button className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-full text-white hover:bg-red-500/60 transition-colors">
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{hotel.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
          <MapPin className="w-4 h-4 text-indigo-light" />
          <span>{hotel.location}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          {[...Array(starRating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-gold fill-gold" />
          ))}
          {halfStar && <Star className="w-4 h-4 text-gold fill-gold/50" />}
          {[...Array(5 - starRating - halfStar)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-4 h-4 text-slate-600" />
          ))}
          <span className="text-sm text-slate-400 ml-1">({hotel.reviews?.length || 0} reviews)</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities?.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity] || null
            return (
              <span key={amenity} className="px-2 py-1 bg-navy/50 border border-white/5 rounded-lg text-xs text-slate-300 flex items-center gap-1">
                {Icon && <Icon className="w-3 h-3" />}
                {amenity}
              </span>
            )
          })}
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-white/5">
          <div>
            <span className="text-2xl font-bold text-white">{hotel.pricePerNight}</span>
<span className="text-slate-400 text-sm ml-1">/ night</span>
          </div>
          <div className="flex items-center gap-1 text-indigo-light font-medium group-hover:text-gold transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard

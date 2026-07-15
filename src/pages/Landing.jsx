import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Hotel, Sparkles, TrendingUp, Users, ArrowRight, Star, Award, CreditCard, Gift, Mountain, Waves, Building2, Trees } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { fetchHotels } from '../redux/hotelSlice'
import SearchBar from '../components/SearchBar'
import HotelCard from '../components/HotelCard'
import { mockHotels } from '../data/mockData'

function Landing() {
  const dispatch = useDispatch()

  const handleImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
  }

  useEffect(() => {
    dispatch(fetchHotels())
  }, [dispatch])

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Recommendations',
      description: 'Our advanced AI analyzes your preferences to suggest the perfect hotel for your trip.',
    },
    {
      icon: TrendingUp,
      title: 'Trending Hotels',
      description: 'Discover the most popular and highest-rated hotels trusted by millions of travelers.',
    },
    {
      icon: Users,
      title: 'Personalized Experience',
      description: 'Get personalized deals, price alerts, and exclusive offers tailored just for you.',
    },
  ]

  const popularDestinations = [
    { name: 'Bali', hotels: 234, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400' },
    { name: 'Santorini', hotels: 156, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac0e0?w=400' },
    { name: 'Tokyo', hotels: 312, image: 'https://images.unsplash.com/photo-1503899036084-c55cdd22da65?w=400' },
    { name: 'Aspen', hotels: 89, image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400' },
  ]

  const cardOffers = [
    {
      bank: 'HDFC Bank',
      card: 'Credit Card',
      offer: 'Up to 20% instant discount on domestic hotels',
      icon: CreditCard,
      color: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-500/30',
    },
    {
      bank: 'ICICI Bank',
      card: 'Debit Card',
      offer: 'Flat ₹1,000 off on bookings above ₹5,000',
      icon: CreditCard,
      color: 'from-orange-500/20 to-orange-600/05',
      border: 'border-orange-500/30',
    },
    {
      bank: 'SBI',
      card: 'Credit Card',
      offer: '10% cashback on resort bookings worldwide',
      icon: CreditCard,
      color: 'from-purple-500/20 to-purple-600/05',
      border: 'border-purple-500/30',
    },
    {
      bank: 'Axis Bank',
      card: 'Debit Card',
      offer: 'Free room upgrade + complimentary breakfast',
      icon: CreditCard,
      color: 'from-emerald-500/20 to-emerald-600/05',
      border: 'border-emerald-500/30',
    },
    {
      bank: 'Kotak Mahindra',
      card: 'Credit Card',
      offer: '2x reward points on all travel bookings',
      icon: Gift,
      color: 'from-pink-500/20 to-pink-600/05',
      border: 'border-pink-500/30',
    },
    {
      bank: 'All Major Banks',
      card: 'Debit & Credit',
      offer: 'Additional 5% off with coupon BANK5',
      icon: CreditCard,
      color: 'from-gold/20 to-gold/05',
      border: 'border-gold/30',
    },
  ]

  const redeemOffers = [
    {
      title: 'Redeem 2,500 Points',
      value: 'Worth ₹500',
      description: 'Get ₹500 off on your next hotel booking',
    },
    {
      title: 'Redeem 5,000 Points',
      value: 'Worth ₹1,200',
      description: 'Free night stay at select properties',
    },
    {
      title: 'Redeem 10,000 Points',
      value: 'Worth ₹2,500',
      description: 'Premium suite upgrade + spa credit',
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600"
            alt="Scenic view"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.15),transparent_50%)]" />
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="absolute w-[500px] h-[500px] bg-indigo/5 rounded-full blur-3xl animate-float" style={{ animationDelay: `${i * 2}s`, top: `${10 + i * 30}%`, left: `${10 + i * 20}%` }} />
        ))}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 animate-slide-up">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-slate-300">AI-Powered Hotel Booking Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Discover Your
            <br />
            <span className="text-gradient">Perfect Stay</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Find the best hotels worldwide with AI-powered recommendations tailored to your preferences.
          </p>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <SearchBar variant="hero" />
          </div>
        </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
      </section>

      {/* Offers Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
              <CreditCard className="w-4 h-4 text-gold" />
              <span className="text-sm text-slate-300">Card Offers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Exclusive Bank Offers</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Save more with leading bank debit and credit card offers on hotel bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardOffers.map((offer, index) => {
              const Icon = offer.icon
              return (
                <div
                  key={offer.bank}
                  className={`glass rounded-2xl p-6 border ${offer.border} bg-gradient-to-br ${offer.color} animate-slide-up opacity-0`}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{offer.bank}</h3>
                      <p className="text-slate-400 text-xs">{offer.card}</p>
                    </div>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{offer.offer}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Redeem Points Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
              <Gift className="w-4 h-4 text-gold" />
              <span className="text-sm text-slate-300">Loyalty Rewards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Redeem Your Points</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Earn points on every booking and redeem them for exclusive rewards after your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {redeemOffers.map((offer, index) => (
              <div
                key={offer.title}
                className="glass rounded-2xl p-6 border border-white/10 text-center animate-slide-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{offer.title}</h3>
                <p className="text-gold font-semibold text-sm mb-2">{offer.value}</p>
                <p className="text-slate-400 text-sm">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
              <Award className="w-4 h-4 text-gold" />
              <span className="text-sm text-slate-300">Why Choose Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">The Future of Travel Booking</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Experience hotel booking like never before with our intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-8 animate-slide-up opacity-0"
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo/20 to-indigo/5 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-indigo-light" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-gold" />
              <span className="text-sm text-slate-300">Popular Destinations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Explore Trending Destinations</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Discover hotels in the world's most sought-after locations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {popularDestinations.map((dest, index) => (
              <Link
                key={dest.name}
                to={`/search?city=${encodeURIComponent(dest.name)}`}
                className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden animate-slide-up opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <img src={dest.image} alt={dest.name} onError={handleImageError} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{dest.name}</h3>
                  <p className="text-slate-300 text-sm">{dest.hotels} hotels</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
                <Star className="w-4 h-4 text-gold fill-gold" />
                <span className="text-sm text-slate-300">Trending Hotels</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Popular This Month</h2>
            </div>
            <Link to="/search" className="hidden sm:flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HotelCard hotel={{
              ...mockHotels[0], isTrending: true, images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800'], thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
            }} index={0} />
            <HotelCard hotel={{
              ...mockHotels[4], isTrending: true, images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f9?w=800'], thumbnail: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f9?w=400',
            }} index={1} />
            <HotelCard hotel={{
              ...mockHotels[2], isTrending: true, images: ['https://images.unsplash.com/photo-1571896349842-68c0da7b2a4f?w=800'], thumbnail: 'https://images.unsplash.com/photo-1571896349842-68c0da7b2a4f?w=400',
            }} index={2} />
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Explore the World?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of travelers who trust StayWise.ai for their perfect hotel experience.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo to-indigo-dark hover:from-indigo-light hover:to-indigo text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo/25 hover:shadow-indigo/40 hover:-translate-y-0.5"
              >
                Start Searching
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

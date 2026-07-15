import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical, Star } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHotels, addHotel, updateHotel, deleteHotel } from '../redux/hotelSlice'
import { mockApi } from '../services/api'

function AdminHotels() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hotels, loading } = useSelector(state => state.hotels)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingHotel, setEditingHotel] = useState(null)
  const [formData, setFormData] = useState({
    name: '', location: '', city: '', country: '', rating: 4.5, pricePerNight: 200,
    totalRooms: 50, availableRooms: 20, description: '', amenities: '', images: '',
  })

  useEffect(() => {
    dispatch(fetchHotels())
  }, [dispatch])

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const hotelData = {
      ...formData,
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
    }
    if (editingHotel) {
      dispatch(updateHotel({ id: editingHotel.id, data: hotelData }))
    } else {
      dispatch(addHotel(hotelData))
    }
    resetForm()
  }

  const handleEdit = (hotel) => {
    setEditingHotel(hotel)
    setFormData({
      name: hotel.name,
      location: hotel.location,
      city: hotel.city,
      country: hotel.country,
      rating: hotel.rating,
      pricePerNight: hotel.pricePerNight,
      totalRooms: hotel.totalRooms,
      availableRooms: hotel.availableRooms,
      description: hotel.description,
      amenities: hotel.amenities.join(', '),
      images: (hotel.images || []).join(', '),
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      dispatch(deleteHotel(id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '', location: '', city: '', country: '', rating: 4.5, pricePerNight: 200,
      totalRooms: 50, availableRooms: 20, description: '', amenities: '', images: '',
    })
    setEditingHotel(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Hotels</h1>
          <p className="text-slate-400">{hotels.length} total hotels</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo hover:bg-indigo-dark text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo/25"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add Hotel'}
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-4">{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hotel Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                <input type="text" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Country</label>
                <input type="text" required value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price per Night</label>
                <input type="number" required value={formData.pricePerNight} onChange={(e) => setFormData({ ...formData, pricePerNight: parseFloat(e.target.value) })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Amenities (comma-separated)</label>
              <input type="text" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} placeholder="WiFi, Pool, Spa, Restaurant" className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Image URLs (comma-separated)</label>
              <input type="text" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-indigo hover:bg-indigo-dark text-white rounded-xl font-medium transition-colors">
                {editingHotel ? 'Update Hotel' : 'Add Hotel'}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 glass rounded-xl text-slate-300 hover:bg-white/5 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Hotel</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden sm:table-cell">Location</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Rating</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden sm:table-cell">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden lg:table-cell">Rooms</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={hotel.thumbnail || hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100'} alt={hotel.name} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100' }} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-white font-medium">{hotel.name}</p>
                        <p className="text-slate-400 text-sm sm:hidden">{hotel.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 hidden sm:table-cell">{hotel.city}</td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-slate-300">{hotel.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 hidden sm:table-cell">{hotel.pricePerNight}</td>
                  <td className="px-6 py-4 text-slate-300 hidden lg:table-cell">{hotel.availableRooms}/{hotel.totalRooms}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => navigate(`/hotel/${hotel.id}`)} className="p-2 text-slate-400 hover:text-indigo-light transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(hotel)} className="p-2 text-slate-400 hover:text-gold transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(hotel.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredHotels.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No hotels found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminHotels

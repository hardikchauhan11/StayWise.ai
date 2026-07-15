import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms, addRoom, updateRoom, deleteRoom, fetchHotels } from '../redux/hotelSlice'
import { mockApi } from '../services/api'
import { Plus, Search, Edit2, Trash2, Eye } from 'lucide-react'

function AdminRooms() {
  const dispatch = useDispatch()
  const { hotels } = useSelector(state => state.hotels)
  const [showForm, setShowForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    hotelId: '', name: '', type: '', pricePerNight: 200, capacity: 2, size: 30,
    description: '', amenities: '', images: '', available: true,
  })

  useEffect(() => {
    dispatch(fetchHotels())
  }, [dispatch])

  const allRooms = hotels.flatMap(h => (h.rooms || []).map(r => ({ ...r, hotelName: h.name })))

  const filteredRooms = allRooms.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    const roomData = {
      ...formData,
      hotelId: parseInt(formData.hotelId),
      amenities: formData.amenities.split(',').map(a => a.trim()).filter(Boolean),
      images: formData.images.split(',').map(i => i.trim()).filter(Boolean),
    }
    if (editingRoom) {
      dispatch(updateRoom({ id: editingRoom.id, data: roomData }))
    } else {
      dispatch(addRoom(roomData))
    }
    resetForm()
  }

  const handleEdit = (room) => {
    setEditingRoom(room)
    setFormData({
      hotelId: room.hotelId.toString(),
      name: room.name,
      type: room.type,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      size: room.size,
      description: room.description,
      amenities: (room.amenities || []).join(', '),
      images: (room.images || []).join(', '),
      available: room.available,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      dispatch(deleteRoom(id))
    }
  }

  const resetForm = () => {
    setFormData({
      hotelId: '', name: '', type: '', pricePerNight: 200, capacity: 2, size: 30,
      description: '', amenities: '', images: '', available: true,
    })
    setEditingRoom(null)
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Manage Rooms</h1>
          <p className="text-slate-400">{allRooms.length} total rooms across {hotels.length} hotels</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo hover:bg-indigo-dark text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo/25"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add Room'}
        </button>
      </div>

      {showForm && (
        <div className="glass rounded-2xl p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-white mb-4">{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Hotel</label>
                <select value={formData.hotelId} onChange={(e) => setFormData({ ...formData, hotelId: e.target.value })} required className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo">
                  <option value="">Select Hotel</option>
                  {hotels.map(h => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Room Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo">
                  <option value="">Select Type</option>
                  <option>Deluxe Room</option>
                  <option>Suite</option>
                  <option>Villa</option>
                  <option>Bungalow</option>
                  <option>Penthouse</option>
                  <option>Chalet</option>
                  <option>Standard Room</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Price per Night</label>
                <input type="number" required value={formData.pricePerNight} onChange={(e) => setFormData({ ...formData, pricePerNight: parseFloat(e.target.value) })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Capacity</label>
                <input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Size (m²)</label>
                <input type="number" value={formData.size} onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Amenities (comma-separated)</label>
              <input type="text" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Image URLs (comma-separated)</label>
              <input type="text" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} className="w-full px-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo" />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-indigo hover:bg-indigo-dark text-white rounded-xl font-medium transition-colors">
                {editingRoom ? 'Update Room' : 'Add Room'}
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 glass rounded-xl text-slate-300 hover:bg-white/5 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rooms..."
              className="w-full pl-10 pr-4 py-2.5 bg-navy border border-white/10 rounded-xl text-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Room</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden sm:table-cell">Hotel</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 hidden md:table-cell">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{room.name}</p>
                    <p className="text-slate-400 text-sm sm:hidden">{room.hotelName}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300 hidden sm:table-cell">{room.hotelName}</td>
                  <td className="px-6 py-4 text-slate-300">{room.type}</td>
                  <td className="px-6 py-4 text-slate-300 hidden md:table-cell">{room.pricePerNight}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${room.available ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                      {room.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(room)} className="p-2 text-slate-400 hover:text-gold transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(room.id)} className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No rooms found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminRooms

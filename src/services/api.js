import { mockHotels, mockRooms, mockBookings, getNextId } from '../data/mockData'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const mockApi = {
  async getHotels() {
    await sleep(300)
    return [...mockHotels]
  },

  async getHotelById(id) {
    await sleep(200)
    const hotel = mockHotels.find(h => h.id === parseInt(id))
    if (!hotel) throw new Error('Hotel not found')
    const rooms = mockRooms.filter(r => r.hotelId === hotel.id)
    return { ...hotel, rooms }
  },

  async getHotelsByCity(city) {
    await sleep(250)
    return mockHotels.filter(h => h.city.toLowerCase().includes(city.toLowerCase()))
  },

  async searchHotels(filters) {
    await sleep(400)
    let results = [...mockHotels]

    if (filters.city) {
      results = results.filter(h =>
        h.city.toLowerCase().includes(filters.city.toLowerCase()) ||
        h.location.toLowerCase().includes(filters.city.toLowerCase())
      )
    }

    if (filters.guests && filters.guests > 0) {
      results = results.filter(h => h.totalRooms >= filters.guests)
    }

    if (filters.rating) {
      results = results.filter(h => h.rating >= filters.rating)
    }

    if (filters.priceMin !== undefined) {
      results = results.filter(h => h.pricePerNight >= filters.priceMin)
    }

    if (filters.priceMax !== undefined) {
      results = results.filter(h => h.pricePerNight <= filters.priceMax)
    }

    if (filters.amenities && filters.amenities.length > 0) {
      results = results.filter(h =>
        filters.amenities.every(a => h.amenities.includes(a))
      )
    }

    if (filters.sortBy === 'price_asc') {
      results.sort((a, b) => a.pricePerNight - b.pricePerNight)
    } else if (filters.sortBy === 'price_desc') {
      results.sort((a, b) => b.pricePerNight - a.pricePerNight)
    } else if (filters.sortBy === 'rating') {
      results.sort((a, b) => b.rating - a.rating)
    }

    return results
  },

  async addHotel(hotelData) {
    await sleep(400)
    const images = hotelData.images || []
    const newHotel = {
      ...hotelData,
      id: getNextId('hotel'),
      images,
      thumbnail: images[0] || hotelData.thumbnail || '',
      amenities: hotelData.amenities || [],
      roomTypes: hotelData.roomTypes || [],
      reviews: [],
      isTrending: false,
      recommended: Math.floor(Math.random() * 40) + 70,
    }
    mockHotels.push(newHotel)
    return { ...newHotel }
  },

  async updateHotel(id, data) {
    await sleep(300)
    const index = mockHotels.findIndex(h => h.id === parseInt(id))
    if (index === -1) throw new Error('Hotel not found')
    const updated = { ...mockHotels[index], ...data }
    if (data.images && data.images.length > 0 && !updated.thumbnail) {
      updated.thumbnail = data.images[0]
    }
    mockHotels[index] = updated
    return { ...mockHotels[index] }
  },

  async deleteHotel(id) {
    await sleep(300)
    const index = mockHotels.findIndex(h => h.id === parseInt(id))
    if (index === -1) throw new Error('Hotel not found')
    mockHotels.splice(index, 1)
  },

  async getRooms() {
    await sleep(200)
    return [...mockRooms]
  },

  async getRoomsByHotel(hotelId) {
    await sleep(200)
    return mockRooms.filter(r => r.hotelId === parseInt(hotelId))
  },

  async addRoom(roomData) {
    await sleep(300)
    const images = roomData.images || []
    const newRoom = {
      ...roomData,
      id: getNextId('room'),
      images,
      thumbnail: images[0] || roomData.thumbnail || '',
    }
    mockRooms.push(newRoom)
    return { ...newRoom }
  },

  async updateRoom(id, data) {
    await sleep(300)
    const index = mockRooms.findIndex(r => r.id === parseInt(id))
    if (index === -1) throw new Error('Room not found')
    const updated = { ...mockRooms[index], ...data }
    if (data.images && data.images.length > 0 && !updated.thumbnail) {
      updated.thumbnail = data.images[0]
    }
    mockRooms[index] = updated
    return { ...mockRooms[index] }
  },

  async deleteRoom(id) {
    await sleep(300)
    const index = mockRooms.findIndex(r => r.id === parseInt(id))
    if (index === -1) throw new Error('Room not found')
    mockRooms.splice(index, 1)
  },

  async getBookings() {
    await sleep(300)
    return [...mockBookings]
  },

  async createBooking(bookingData) {
    await sleep(500)
    const newBooking = {
      ...bookingData,
      id: getNextId('booking'),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    mockBookings.push(newBooking)
    return { ...newBooking }
  },

  async updateBookingStatus(id, status) {
    await sleep(200)
    const index = mockBookings.findIndex(b => b.id === parseInt(id))
    if (index === -1) throw new Error('Booking not found')
    mockBookings[index].status = status
    return { ...mockBookings[index] }
  },

  async login(credentials) {
    await sleep(300)
    if (credentials.email === 'admin@staywise.ai' && credentials.password === 'admin123') {
      return {
        success: true,
        user: {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@staywise.ai',
          role: 'admin',
          token: 'mock-admin-token-123',
        },
      }
    }
    if (credentials.email) {
      return {
        success: true,
        user: {
          id: `user-${Date.now()}`,
          name: credentials.name || 'Guest User',
          email: credentials.email,
          role: 'user',
          token: `mock-token-${Date.now()}`,
        },
      }
    }
    return {
      success: false,
      message: 'Invalid credentials',
    }
  },

  async register(userData) {
    await sleep(300)
    if (userData.email) {
      return {
        success: true,
        user: {
          id: `user-${Date.now()}`,
          name: userData.name || 'User',
          email: userData.email,
          role: 'user',
          token: `mock-token-${Date.now()}`,
        },
      }
    }
    return { success: false, message: 'Registration failed' }
  },

  async getRecommendations(userId) {
    await sleep(400)
    const recommended = mockHotels
      .filter(h => h.recommended >= 85)
      .sort((a, b) => b.recommended - a.recommended)
      .slice(0, 5)
    return recommended
  },

  async getTrendingHotels() {
    await sleep(300)
    return mockHotels.filter(h => h.isTrending)
  },
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  hotels: [],
  filteredHotels: [],
  selectedHotel: null,
  loading: false,
  error: null,
  filters: {
    city: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    priceRange: [0, 1000],
    rating: 0,
    amenities: [],
    roomType: '',
    sortBy: 'recommended',
  },
}

export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async (_, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const hotels = await mockApi.getHotels()
      return hotels
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchHotelById = createAsyncThunk(
  'hotels/fetchHotelById',
  async (id, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const hotel = await mockApi.getHotelById(id)
      return hotel
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addHotel = createAsyncThunk(
  'hotels/addHotel',
  async (hotelData, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const hotel = await mockApi.addHotel(hotelData)
      return hotel
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateHotel = createAsyncThunk(
  'hotels/updateHotel',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const hotel = await mockApi.updateHotel(id, data)
      return hotel
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteHotel = createAsyncThunk(
  'hotels/deleteHotel',
  async (id, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      await mockApi.deleteHotel(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchRooms = createAsyncThunk(
  'hotels/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const rooms = await mockApi.getRooms()
      return rooms
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addRoom = createAsyncThunk(
  'hotels/addRoom',
  async (roomData, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const room = await mockApi.addRoom(roomData)
      return room
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateRoom = createAsyncThunk(
  'hotels/updateRoom',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const room = await mockApi.updateRoom(id, data)
      return room
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteRoom = createAsyncThunk(
  'hotels/deleteRoom',
  async (id, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      await mockApi.deleteRoom(id)
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    setSelectedHotel: (state, action) => {
      state.selectedHotel = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false
        state.hotels = action.payload
        state.filteredHotels = action.payload
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.selectedHotel = action.payload
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.hotels.push(action.payload)
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.hotels.findIndex(h => h.id === action.payload.id)
        if (index !== -1) {
          state.hotels[index] = action.payload
        }
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(h => h.id !== action.payload)
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        if (!state.rooms) state.rooms = []
        state.rooms.push(action.payload)
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        if (!state.rooms) return
        const index = state.rooms.findIndex(r => r.id === action.payload.id)
        if (index !== -1) {
          state.rooms[index] = action.payload
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        if (!state.rooms) return
        state.rooms = state.rooms.filter(r => r.id !== action.payload)
      })
  },
})

export const { setFilters, resetFilters, setSelectedHotel, clearError } = hotelSlice.actions
export default hotelSlice.reducer

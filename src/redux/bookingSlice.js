import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
}

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const booking = await mockApi.createBooking(bookingData)
      return booking
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const bookings = await mockApi.getBookings()
      return bookings
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateBookingStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const booking = await mockApi.updateBookingStatus(id, status)
      return booking
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    clearBooking: (state) => {
      state.currentBooking = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false
        state.currentBooking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(b => b.id === action.payload.id)
        if (index !== -1) {
          state.bookings[index] = action.payload
        }
      })
  },
})

export const { setCurrentBooking, clearBooking, clearError } = bookingSlice.actions
export default bookingSlice.reducer

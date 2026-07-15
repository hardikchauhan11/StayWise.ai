import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import hotelReducer from './hotelSlice'
import bookingReducer from './bookingSlice'
import recommendationReducer from './recommendationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelReducer,
    bookings: bookingReducer,
    recommendations: recommendationReducer,
  },
})

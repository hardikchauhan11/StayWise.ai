import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  recommendations: [],
  trendingHotels: [],
  personalized: [],
  loading: false,
  error: null,
}

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetchRecommendations',
  async (userId, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const recommendations = await mockApi.getRecommendations(userId)
      return recommendations
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchTrendingHotels = createAsyncThunk(
  'recommendations/fetchTrendingHotels',
  async (_, { rejectWithValue }) => {
    try {
      const { mockApi } = await import('../services/api')
      const trending = await mockApi.getTrendingHotels()
      return trending
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload
      })
      .addCase(fetchTrendingHotels.fulfilled, (state, action) => {
        state.trendingHotels = action.payload
      })
  },
})

export const { clearError } = recommendationSlice.actions
export default recommendationSlice.reducer

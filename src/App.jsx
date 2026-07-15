import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Landing from './pages/Landing'
import SearchResults from './pages/SearchResults'
import HotelDetails from './pages/HotelDetails'
import Booking from './pages/Booking'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminHotels from './pages/AdminHotels'
import AdminRooms from './pages/AdminRooms'
import AdminBookings from './pages/AdminBookings'
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'search', element: <SearchResults /> },
      { path: 'hotel/:id', element: <HotelDetails /> },
      { path: 'booking/:id', element: <Booking /> },
      { path: 'payment', element: <Payment /> },
      { path: 'confirmation', element: <Confirmation /> },
      { path: 'admin/login', element: <AdminLogin /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute> },
      { path: 'dashboard', element: <ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute> },
      { path: 'hotels', element: <ProtectedRoute requireAdmin><AdminHotels /></ProtectedRoute> },
      { path: 'rooms', element: <ProtectedRoute requireAdmin><AdminRooms /></ProtectedRoute> },
      { path: 'bookings', element: <ProtectedRoute requireAdmin><AdminBookings /></ProtectedRoute> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App

import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Hotel, User, LogOut, Settings, Shield, Search, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout: authLogout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [location.pathname])

  const handleLogout = async () => {
    await authLogout()
    dispatch(logout())
    navigate('/')
  }

  const isAdmin = user?.role === 'admin'
  const isActive = (path) => location.pathname === path ? 'text-indigo-light' : 'text-slate-300 hover:text-white'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo to-gold rounded-xl flex items-center justify-center">
            <Hotel className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Stay<span className="text-gradient">Wise</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={`px-4 py-2 rounded-lg transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/search" className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 ${isActive('/search')}`}>
            <Search className="w-4 h-4" /> Search
          </Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className={`px-4 py-2 rounded-lg transition-colors ${location.pathname.startsWith('/admin') ? 'text-indigo-light' : 'text-slate-300 hover:text-white'}`}>
              Dashboard
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 text-slate-300 hover:text-white transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 glass rounded-lg">
                <User className="w-4 h-4 text-indigo-light" />
                <span className="text-sm font-medium text-slate-200">{user?.name}</span>
              </div>
              {isAdmin ? (
                <Link to="/admin/dashboard" className="p-2 text-slate-300 hover:text-white transition-colors">
                  <Shield className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/search" className="px-4 py-2 bg-indigo hover:bg-indigo-dark text-white rounded-lg text-sm font-medium transition-colors">
                  My Trips
                </Link>
              )}
              <button onClick={handleLogout} className="p-2 text-slate-300 hover:text-red-400 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="flex items-center gap-2 px-4 py-2 bg-indigo hover:bg-indigo-dark text-white rounded-lg text-sm font-medium transition-colors">
              <Shield className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <div className="glass rounded-xl mx-4 p-4 flex flex-col gap-2">
          <Link to="/" className="px-4 py-3 text-slate-200 hover:bg-white/5 rounded-lg transition-colors">Home</Link>
          <Link to="/search" className="px-4 py-3 text-slate-200 hover:bg-white/5 rounded-lg transition-colors">Search</Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className="px-4 py-3 text-slate-200 hover:bg-white/5 rounded-lg transition-colors">Dashboard</Link>
          )}
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 text-slate-200 flex items-center gap-2">
                <User className="w-4 h-4" /> {user?.name}
              </div>
              <button onClick={handleLogout} className="px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/admin/login" className="px-4 py-3 bg-indigo text-white rounded-lg text-center font-medium">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

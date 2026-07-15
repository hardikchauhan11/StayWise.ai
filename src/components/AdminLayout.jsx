import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Hotel, Bed, CalendarCheck, LogOut, User, Menu, X, ChevronDown
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout: authLogout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authLogout()
    navigate('/admin/login')
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/hotels', icon: Hotel, label: 'Hotels' },
    { to: '/admin/rooms', icon: Bed, label: 'Rooms' },
    { to: '/admin/bookings', icon: CalendarCheck, label: 'Bookings' },
  ]

  return (
    <div className="min-h-screen bg-navy-dark">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/5">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-white hover:bg-white/5 rounded-lg transition-colors">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <span className="text-lg font-bold text-white">StayWise Admin</span>
        <div className="w-10" />
      </div>

      <div className="flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-navy border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/5 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo to-gold rounded-xl flex items-center justify-center">
                  <Hotel className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">StayWise</h1>
                  <p className="text-xs text-slate-400">Admin Portal</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo/20 text-indigo-light border border-indigo/30'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-white/5">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-indigo-light" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@staywise.ai'}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute bottom-full left-4 right-4 mb-2 glass rounded-xl overflow-hidden shadow-xl">
                    <button
                      onClick={() => { setUserMenuOpen(false); navigate('/'); }}
                      className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Back to Site
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

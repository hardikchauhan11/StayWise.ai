import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, register, logout, clearError } from '../redux/authSlice'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error } = useSelector(state => state.auth)
  const [localLoading, setLocalLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('staywise_user')
    if (stored) {
      dispatch({ type: 'auth/setUser', payload: JSON.parse(stored) })
    }
  }, [])

  const authLogin = async (credentials) => {
    setLocalLoading(true)
    try {
      await dispatch(login(credentials)).unwrap()
    } catch (err) {
      throw err
    } finally {
      setLocalLoading(false)
    }
  }

  const authRegister = async (userData) => {
    setLocalLoading(true)
    try {
      await dispatch(register(userData)).unwrap()
    } catch (err) {
      throw err
    } finally {
      setLocalLoading(false)
    }
  }

  const authLogout = async () => {
    await dispatch(logout()).unwrap()
  }

  const clearAuthError = () => dispatch(clearError())

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading: loading || localLoading,
      error,
      login: authLogin,
      register: authRegister,
      logout: authLogout,
      clearError: clearAuthError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

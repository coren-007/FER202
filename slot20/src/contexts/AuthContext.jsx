 import { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUsers } from '../services/api'

/**
 * AuthContext quản lý trạng thái xác thực người dùng (admin) trong ứng dụng.
 * Cung cấp: `isAuthenticated`, `user`, `loading`, `error`, cùng các hàm `login`, `logout`, `clearError`.
 * Sử dụng cùng hook `useAuth` để truy cập.
 */
const AuthContext = createContext()

/**
 * Trạng thái khởi tạo của AuthContext
 * - user: thông tin user đăng nhập
 * - isAuthenticated: đã đăng nhập hay chưa
 * - isLoading: trạng thái đang xử lý (login)
 * - error: thông báo lỗi gần nhất
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

/**
 * Reducer xử lý các action liên quan đến xác thực
 * Action types:
 * - LOGIN_START | LOGIN_SUCCESS | LOGIN_FAILURE
 * - LOGOUT | CLEAR_ERROR | HYDRATE
 */
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload }
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT':
      return { ...initialState }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'HYDRATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

/**
 * Provider bao bọc ứng dụng, cung cấp ngữ cảnh xác thực cho con.
 * @param {object} props
 * @param {React.ReactNode} props.children - Cây component con cần quyền truy cập AuthContext.
 */
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) {
        const user = JSON.parse(raw)
        dispatch({ type: 'HYDRATE', payload: { user, isAuthenticated: true } })
      }
    } catch (_) {
      // ignore
    }
  }, [])

  /** Xóa thông báo lỗi hiện tại. */
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

  /**
   * Đăng nhập bằng username/email và password. Chỉ cho phép admin có trạng thái active.
   * @param {{ usernameOrEmail: string, password: string }} payload
   * @returns {Promise<{success: boolean, user?: any, error?: string}>}
   */
  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const accounts = await getUsers()
      const user = accounts.find(
        (acc) => (
          acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)
        ) && acc.password === password
      )
      if (!user) {
        const msg = 'Invalid username/email or password!'
        dispatch({ type: 'LOGIN_FAILURE', payload: msg })
        return { success: false, error: msg }
      }
      // Gate access to dashboard: only admin with active status can proceed
      if (user.status !== 'active') {
        const msg = 'Tài khoản bị khóa.'
        dispatch({ type: 'LOGIN_FAILURE', payload: msg })
        return { success: false, error: msg }
      }
      if (user.role !== 'admin') {
        const msg = 'Bạn không có quyền truy cập.'
        dispatch({ type: 'LOGIN_FAILURE', payload: msg })
        return { success: false, error: msg }
      }
      localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      return { success: true, user }
    } catch (err) {
      const msg = err?.message || 'Login failed due to a network error.'
      dispatch({ type: 'LOGIN_FAILURE', payload: msg })
      return { success: false, error: msg }
    }
  }

  /**
   * Đăng xuất, xóa thông tin trong localStorage và điều hướng về /login.
   */
  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.isLoading,
      error: state.error,
      login,
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook truy cập nhanh AuthContext.
 * @returns {{ isAuthenticated: boolean, user: any, loading: boolean, error: string|null, login: Function, logout: Function, clearError: Function }}
 */
export const useAuth = () => useContext(AuthContext)

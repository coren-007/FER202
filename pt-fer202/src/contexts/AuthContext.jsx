import { createContext, useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const AuthContext = createContext()

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: '' }
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, isAuthenticated: true, user: action.payload }
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { ...initialState }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const login = async (identifier, password) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const { data } = await api.get('/users')
      const user = data.find(
        (acc) => (
          acc.username === identifier || (acc.email ? acc.email === identifier : false)
        ) && acc.password === password
      )
      if (!user) {
        const msg = 'Invalid username/email or password!'
        dispatch({ type: 'LOGIN_FAILURE', payload: msg })
        return { success: false, error: msg }
      }
      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
      return { success: true, user }
    } catch (err) {
      const msg = 'Unable to login. Please try again.'
      dispatch({ type: 'LOGIN_FAILURE', payload: msg })
      return { success: false, error: msg }
    }
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login', { replace: true })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

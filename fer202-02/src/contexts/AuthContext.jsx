 import { createContext, useContext, useEffect, useReducer } from 'react'
 import { useNavigate } from 'react-router-dom'
 import { getUsers } from '../services/api'

const AuthContext = createContext()

 const initialState = {
   user: null,
   isAuthenticated: false,
   isLoading: false,
   error: null
 }

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

 export function AuthProvider({ children }) {
   const [state, dispatch] = useReducer(reducer, initialState)
   const navigate = useNavigate()

   // Hydrate from localStorage
   useEffect(() => {
     try {
       const raw = localStorage.getItem('user')
       if (raw) {
         const user = JSON.parse(raw)
         dispatch({ type: 'HYDRATE', payload: { user, isAuthenticated: true } })
       }
     } catch {}
   }, [])

   const clearError = () => dispatch({ type: 'CLEAR_ERROR' })

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
       localStorage.setItem('user', JSON.stringify(user))
       dispatch({ type: 'LOGIN_SUCCESS', payload: user })
       return { success: true, user }
     } catch (err) {
       const msg = err?.message || 'Login failed due to a network error.'
       dispatch({ type: 'LOGIN_FAILURE', payload: msg })
       return { success: false, error: msg }
     }
   }

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

export const useAuth = () => useContext(AuthContext)

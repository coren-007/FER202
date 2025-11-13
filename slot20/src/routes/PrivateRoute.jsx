import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Route bảo vệ: chỉ render `children` khi đã đăng nhập, ngược lại chuyển hướng về /login.
 * @param {{ children: import('react').ReactNode }} props
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

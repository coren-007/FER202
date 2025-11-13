 import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import PrivateRoute from './PrivateRoute'
import UserList from '../pages/UserList'
import UsersRTK from '../pages/UsersRTK'
import PaymentsRTK from '../pages/PaymentsRTK'

/**
 * Định nghĩa bản đồ route của ứng dụng.
 * - /login: trang đăng nhập (public)
 * - /home, /users: route bảo vệ, yêu cầu đăng nhập (qua PrivateRoute)
 * - /: chuyển hướng về /home
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
      <Route path="/rtk-users" element={<PrivateRoute><UsersRTK /></PrivateRoute>} />
      <Route path="/rtk-payments" element={<PrivateRoute><PaymentsRTK /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

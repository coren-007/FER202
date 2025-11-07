 import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import PrivateRoute from './PrivateRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

 import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contexts/AuthContext'
import { PaymentProvider } from './contexts/PaymentContext'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

/**
 * Thành phần gốc của ứng dụng: thiết lập Router và bọc các Provider (Auth, Payment).
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <PaymentProvider>
          <AppRoutes />
        </PaymentProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

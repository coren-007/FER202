 import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './contexts/AuthContext'
import { PaymentProvider } from './contexts/PaymentContext'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

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

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MovieManager from './pages/MovieManager';
import Login from './pages/Login';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieManager />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

/**
 * Header điều hướng: liên kết về trang chủ, trang Users, hiển thị tên người dùng và nút đăng xuất.
 */
export default function NavigationHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const fullName = user?.fullName || user?.username || 'Student'

  /**
   * Xử lý đăng xuất và điều hướng về /login.
   */
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center gap-2">
          <img src="/images/logo.png" alt="PersonalBudget logo" width="32" height="32" style={{ objectFit: 'contain', borderRadius: '50%' }} />
          <span>PersonalBudget</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Navbar.Text className="me-3">Signed in as: <strong>{fullName}</strong></Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

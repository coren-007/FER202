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
        <Navbar.Brand as={Link} to="/home">TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/users">User Management</Nav.Link>
            <Nav.Link as={Link} to="/rtk-users">Users RTK</Nav.Link>
            <Nav.Link as={Link} to="/rtk-payments">Payments RTK</Nav.Link>
            <Navbar.Text className="me-3">Signed in as: <strong>{fullName}</strong></Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>TuitionTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Navbar.Text className="me-3">Signed in as {user?.fullName}</Navbar.Text>
            <Button variant="outline-light" onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

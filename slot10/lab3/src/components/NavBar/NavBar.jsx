import { Container, Nav, Navbar, Form, FormControl, Button, Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Search, User, Heart, LogIn } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🎬 Movies Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex me-3">
            <FormControl
              type="search"
              placeholder="Quick search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="warning">
              <Search size={18} />
            </Button>
          </Form>
          <Nav>
            <NavDropdown
              title={
                <span>
                  <User size={18} className="me-1" />
                  Account
                </span>
              }
              id="account-dropdown"
            >
              <NavDropdown.Item as={Link} to="/account">
                Manage Your Profiles
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/account">
                Build your Account
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Change Password</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">
              <LogIn size={18} className="me-1" />
              Login
            </Nav.Link>
            <Nav.Link href="#">
              <Heart size={18} className="me-1" />
              Favourites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

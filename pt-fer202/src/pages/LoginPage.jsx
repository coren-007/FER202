import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import ConfirmModal from '../components/ConfirmModal'
import { useAuth } from '../contexts/AuthContext'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const { login, error } = useAuth()

  const validate = () => {
    const e = {}
    if (!identifier.trim()) e.identifier = 'Username or Email is required.'
    if (!password) e.password = 'Password is required.'
    if (password && password.length < 6) e.password = 'Password must be at least 6 characters.'
    if (identifier.includes('@') && !emailRegex.test(identifier)) e.identifier = 'Email is not in correct format.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const res = await login(identifier, password)
    if (res.success) {
      setShow(true)
      setTimeout(() => navigate('/home'), 1200)
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-3">Login</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={submit} noValidate>
                <Form.Group className="mb-3">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control value={identifier} onChange={e => setIdentifier(e.target.value)} isInvalid={!!errors.identifier} placeholder="Enter username or email" />
                  <Form.Control.Feedback type="invalid">{errors.identifier}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={!!errors.password} placeholder="Enter password" />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2">
                  <Button type="submit" className="flex-grow-1">Login</Button>
                  <Button type="button" variant="secondary" className="flex-grow-1" onClick={() => { setIdentifier(''); setPassword(''); setErrors({}) }}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal show={show} onHide={() => setShow(false)} title="Login Successful" message={`Welcome, ${identifier}! Login successful.`} />
    </Container>
  )
}

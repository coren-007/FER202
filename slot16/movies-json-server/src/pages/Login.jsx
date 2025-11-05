import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { login } = useAuthDispatch();
  const { loading, error, user } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/movies';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);
    const ok = await login(username, password);
    if (ok) { setShowSuccess(true); }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="p-3">
            <Card.Body>
              <h2 className="mb-4 text-center">Đăng nhập hệ thống</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập username (tối thiểu 3 ký tự).
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={3}
                  />
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập mật khẩu (tối thiểu 3 ký tự).
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showSuccess} onHide={() => { setShowSuccess(false); navigate(from, { replace: true }); }}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xin chào{user?.name ? `, ${user.name}` : ''}! Chúc bạn một ngày tốt lành.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setShowSuccess(false); navigate(from, { replace: true }); }}>
            Vào trang phim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Login;
import React, { useReducer, useEffect } from 'react';
import { Button, Card, Form, Alert, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

// 1. Khởi tạo trạng thái cho form
const initialFormState = {
  username: '',
  password: '',
  errors: {},
  touched: {
    username: false,
    password: false
  }
};

// 3. Hàm validation
const validateForm = (state) => {
  const errors = {};

  if (!state.username.trim()) {
    errors.username = 'Vui lòng nhập tên đăng nhập!';
  } else if (state.username.length < 3) {
    errors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự!';
  }

  if (!state.password.trim()) {
    errors.password = 'Vui lòng nhập mật khẩu!';
  } else if (state.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
  }

  return errors;
};

// 4. Định nghĩa hàm reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_TOUCHED':
      return { 
        ...state, 
        touched: { ...state.touched, [action.field]: true } 
      };
    case 'VALIDATE':
      return { ...state, errors: validateForm(state) };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
}

const LoginForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { state: authState, login, clearError } = useAuth();

  // Validate khi form thay đổi
  useEffect(() => {
    if (formState.touched.username || formState.touched.password) {
      dispatch({ type: 'VALIDATE' });
    }
  }, [formState.username, formState.password, formState.touched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Đánh dấu tất cả các field đã được touch
    dispatch({ type: 'SET_TOUCHED', field: 'username' });
    dispatch({ type: 'SET_TOUCHED', field: 'password' });
    dispatch({ type: 'VALIDATE' });

    const errors = validateForm(formState);
    
    if (Object.keys(errors).length === 0) {
      login(formState.username, formState.password);
    }
  };

  const handleUsernameChange = (e) => {
    dispatch({ type: 'SET_USERNAME', payload: e.target.value });
    clearError();
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
    clearError();
  };

  const handleBlur = (field) => {
    dispatch({ type: 'SET_TOUCHED', field });
  };

  // Nếu đã đăng nhập thành công
  if (authState.isAuthenticated && authState.user) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="card-custom text-center">
              <Card.Body className="p-5">
                <div className="mb-4">
                  <div className="display-1">✅</div>
                </div>
                <h2 className="text-success mb-3">Đăng nhập thành công!</h2>
                <Card className="bg-light mb-4">
                  <Card.Body>
                    <p className="mb-2"><strong>Tên đăng nhập:</strong> {authState.user.username}</p>
                    <p className="mb-2"><strong>Email:</strong> {authState.user.email}</p>
                    <p className="mb-0"><strong>Vai trò:</strong> <span className="badge bg-primary">{authState.user.role.toUpperCase()}</span></p>
                  </Card.Body>
                </Card>
                <div className="d-flex gap-2 justify-content-center">
                  <Button variant="danger" onClick={() => {
                    dispatch({ type: 'RESET' });
                    clearError();
                  }}>
                    🚪 Đăng xuất
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="card-custom">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="display-3 mb-3">🔐</div>
                <h2 className="fw-bold">Đăng Nhập Hệ Thống</h2>
                <p className="text-muted">Chỉ Admin mới được phép truy cập</p>
              </div>

              {authState.error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                  <strong>❌ Lỗi:</strong> {authState.error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập tên đăng nhập hoặc email"
                    value={formState.username}
                    onChange={handleUsernameChange}
                    onBlur={() => handleBlur('username')}
                    isInvalid={formState.touched.username && !!formState.errors.username}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={formState.password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                    isInvalid={formState.touched.password && !!formState.errors.password}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formState.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    className="fw-bold"
                  >
                    🚀 Đăng Nhập
                  </Button>
                </div>
              </Form>

              <Card className="bg-light mt-4">
                <Card.Body className="small">
                  <p className="mb-2 fw-bold">📝 Tài khoản test:</p>
                  <p className="mb-1">👤 Admin: <code>admin</code> / <code>123456</code></p>
                  <p className="mb-0 text-muted">⚠️ User thường không được phép đăng nhập</p>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

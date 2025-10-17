// ex4
import React, { useReducer } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

// Khởi tạo trạng thái ban đầu
const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: {},
  isSubmitting: false,
  submitSuccess: false,
};

// Định nghĩa hàm reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors, isSubmitting: false };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true, submitSuccess: false };
    case 'SUBMIT_SUCCESS':
      return { ...initialState, submitSuccess: true };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

function SignUpForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate full name
    if (!state.fullName.trim()) {
      errors.fullName = 'Họ tên không được để trống';
    } else if (state.fullName.trim().length < 3) {
      errors.fullName = 'Họ tên phải có ít nhất 3 ký tự';
    }

    // Validate email
    if (!state.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Validate password
    if (!state.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (state.password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(state.password)) {
      errors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
    }

    // Validate confirm password
    if (!state.confirmPassword) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SUBMIT_START' });

    // Giả lập API call
    setTimeout(() => {
      console.log('Sign up data:', {
        fullName: state.fullName,
        email: state.email,
        password: state.password,
      });
      dispatch({ type: 'SUBMIT_SUCCESS' });
    }, 1500);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="text-center mb-4 fs-4 fw-bold">
          Đăng Ký Tài Khoản
        </Card.Title>

        {state.submitSuccess && (
          <Alert variant="success" className="mb-3">
            Đăng ký thành công! Chào mừng {state.fullName}!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ và Tên</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Nhập họ và tên đầy đủ"
              value={state.fullName}
              onChange={handleChange}
              isInvalid={!!state.errors.fullName}
              disabled={state.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={state.email}
              onChange={handleChange}
              isInvalid={!!state.errors.email}
              disabled={state.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Tạo mật khẩu"
              value={state.password}
              onChange={handleChange}
              isInvalid={!!state.errors.password}
              disabled={state.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.password}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Xác nhận Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={state.confirmPassword}
              onChange={handleChange}
              isInvalid={!!state.errors.confirmPassword}
              disabled={state.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button
              variant="primary"
              type="submit"
              className="flex-grow-1"
              disabled={state.isSubmitting}
            >
              {state.isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleReset}
              disabled={state.isSubmitting}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SignUpForm;

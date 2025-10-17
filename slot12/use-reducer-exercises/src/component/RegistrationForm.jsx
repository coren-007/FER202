//ex7
import { useState } from 'react';
import { Form, Button, Card, Modal, Row, Col, Toast, ToastContainer } from 'react-bootstrap';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    const trimmed = username.trim();
    if (trimmed.length < 3) return 'Username phải có ít nhất 3 ký tự';
    if (!/^[a-zA-Z0-9_.]+$/.test(trimmed)) return 'Username chỉ chứa chữ, số, _ hoặc .';
    if (username !== trimmed) return 'Username không được có khoảng trắng đầu/cuối';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email không đúng định dạng';
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) return 'Password phải có ít nhất 8 ký tự';
    if (!/[A-Z]/.test(password)) return 'Password phải có ít nhất 1 chữ hoa';
    if (!/[a-z]/.test(password)) return 'Password phải có ít nhất 1 chữ thường';
    if (!/[0-9]/.test(password)) return 'Password phải có ít nhất 1 chữ số';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password phải có ít nhất 1 ký tự đặc biệt';
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return 'Confirm password không khớp';
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    let error = '';
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        // Re-validate confirm password if it exists
        if (formData.confirmPassword) {
          const confirmError = validateConfirmPassword(value, formData.confirmPassword);
          setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value);
        break;
      default:
        break;
    }

    setErrors(prev => {
      if (error) {
        return { ...prev, [name]: error };
      } else {
        const { [name]: removed, ...rest } = prev;
        return rest;
      }
    });
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      Object.keys(errors).length === 0 &&
      !validateUsername(formData.username) &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password) &&
      !validateConfirmPassword(formData.password, formData.confirmPassword)
    );
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    handleCancel();
  };

  return (
    <>
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Exercise 7: Form Đăng Ký Tài Khoản</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username (≥3 ký tự)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Chỉ chữ, số, _ hoặc . (≥3 ký tự)
                  </Form.Text>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    ≥8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt
                  </Form.Text>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                className="flex-grow-1"
                disabled={!isFormValid()}
              >
                Submit
              </Button>
              <Button 
                variant="secondary" 
                type="button" 
                onClick={handleCancel}
                className="flex-grow-1"
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Thành công!</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Submitted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Đăng Ký Thành Công! 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5 className="text-center mb-4">Thông Tin Đã Đăng Ký</h5>
              <Row>
                <Col md={6}>
                  <p><strong>Username:</strong> {formData.username}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Email:</strong> {formData.email}</p>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <p><strong>Password:</strong> {'•'.repeat(formData.password.length)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Trạng thái:</strong> <span className="text-success">✓ Đã xác thực</span></p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegistrationForm;

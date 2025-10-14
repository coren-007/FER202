import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

export default function AboutForm() {
  return (
    <>
      <h4 className="mb-3">
        <PersonCircle className="me-2" />
        About You
      </h4>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>First Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" required isInvalid />
            <Form.Control.Feedback type="invalid">
              First name is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Last name is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Email *</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Email is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Phone *</Form.Label>
            <Form.Control type="tel" placeholder="Enter phone number" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Phone number is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Age *</Form.Label>
            <Form.Control type="number" placeholder="Enter age" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Age is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Avatar *</Form.Label>
            <Form.Control type="file" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Avatar is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

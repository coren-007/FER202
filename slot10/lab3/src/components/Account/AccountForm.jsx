import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { Lock, Person } from "react-bootstrap-icons";

export default function AccountForm() {
  return (
    <>
      <h4 className="mb-3">
        <Lock className="me-2" />
        Account Security
      </h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Person />
            </InputGroup.Text>
            <Form.Control type="text" placeholder="Enter username" required isInvalid />
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            Username is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Lock />
            </InputGroup.Text>
            <Form.Control type="password" placeholder="Enter password" required isInvalid />
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password *</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Lock />
            </InputGroup.Text>
            <Form.Control type="password" placeholder="Confirm password" required isInvalid />
          </InputGroup>
          <Form.Control.Feedback type="invalid" className="d-block">
            Password confirmation is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Secret Question *</Form.Label>
          <Form.Select required isInvalid>
            <option value="">Choose a question...</option>
            <option value="1">What is your mother's maiden name?</option>
            <option value="2">What was your first pet's name?</option>
            <option value="3">What city were you born in?</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a secret question.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Answer *</Form.Label>
          <Form.Control type="text" placeholder="Enter your answer" required isInvalid />
          <Form.Control.Feedback type="invalid">
            Answer is required.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </>
  );
}

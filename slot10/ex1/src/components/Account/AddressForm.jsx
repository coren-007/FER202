import { Form, Row, Col } from "react-bootstrap";
import { GeoAlt } from "react-bootstrap-icons";

export default function AddressForm() {
  return (
    <>
      <h4 className="mb-3">
        <GeoAlt className="me-2" />
        Your Address
      </h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Street *</Form.Label>
          <Form.Control type="text" placeholder="Enter street address" required isInvalid />
          <Form.Control.Feedback type="invalid">
            Street address is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>City *</Form.Label>
            <Form.Control type="text" placeholder="Enter city" required isInvalid />
            <Form.Control.Feedback type="invalid">
              City is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Zip Code *</Form.Label>
            <Form.Control type="text" placeholder="Enter zip code" required isInvalid />
            <Form.Control.Feedback type="invalid">
              Zip code is required.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Country *</Form.Label>
          <Form.Select required isInvalid>
            <option value="">Choose a country...</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Japan">Japan</option>
            <option value="Vietnam">Vietnam</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Please select a country.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </>
  );
}

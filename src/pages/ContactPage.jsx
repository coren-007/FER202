import { Container, Form, Button, Card } from "react-bootstrap";

export default function ContactPage() {
  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Body>
          <h1 className="mb-4">Contact Us</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Your message" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

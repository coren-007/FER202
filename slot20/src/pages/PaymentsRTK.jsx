import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Form, Alert, Badge } from 'react-bootstrap'
import NavigationHeader from '../components/NavigationHeader'
import { createPayment, refundPayment, selectSuccessfulPayments } from '../features/payments/paymentsSlice'

export default function PaymentsRTK() {
  const dispatch = useDispatch()
  const { list, isLoading, error } = useSelector(state => state.payments)
  const successful = useSelector(selectSuccessfulPayments)

  const [form, setForm] = useState({ amount: 0, method: 'CARD' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }))
  }

  const handleCreate = () => {
    dispatch(createPayment({ ...form, status: 'SUCCESS', createdAt: new Date().toISOString() }))
  }

  const handleRefund = (id) => {
    dispatch(refundPayment(id))
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-3">
        <Row>
          <Col>
            <Card className="mb-3">
              <Card.Header>
                <h4 className="mb-0">Payments (Redux Toolkit)</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger" className="mb-3">{String(error)}</Alert>}

                <Form className="row g-3 mb-3">
                  <Form.Group className="col-md-4">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" name="amount" value={form.amount} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="col-md-4">
                    <Form.Label>Method</Form.Label>
                    <Form.Select name="method" value={form.method} onChange={handleChange}>
                      <option value="CARD">CARD</option>
                      <option value="WALLET">WALLET</option>
                      <option value="BANK">BANK</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-md-4 d-flex align-items-end">
                    <Button disabled={isLoading} onClick={handleCreate}>
                      {isLoading ? 'Processing...' : 'Create Payment'}
                    </Button>
                  </Form.Group>
                </Form>

                <div className="mb-2">Successful payments: <Badge bg="success">{successful.length}</Badge></div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map(p => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.amount}</td>
                          <td>{p.method}</td>
                          <td>
                            {p.status === 'SUCCESS' && <Badge bg="success">SUCCESS</Badge>}
                            {p.status === 'REFUNDED' && <Badge bg="secondary">REFUNDED</Badge>}
                            {p.status !== 'SUCCESS' && p.status !== 'REFUNDED' && <Badge bg="warning" text="dark">{p.status}</Badge>}
                          </td>
                          <td>
                            <Button size="sm" variant="outline-secondary" disabled={p.status === 'REFUNDED' || isLoading} onClick={() => handleRefund(p.id)}>
                              Refund
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {list.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center text-muted">No payments. Create one above.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

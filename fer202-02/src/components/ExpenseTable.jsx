import { useState } from 'react'
import { Table, Spinner, Alert, Card, Button, Form, Row, Col } from 'react-bootstrap'
import { useexpenses } from '../contexts/PaymentContext'
import { useAuth } from '../contexts/AuthContext'

/**
 * Expense Management table: list, add, edit, delete personal expenses.
 */
export default function ExpenseTable() {
  const { expenses, totalAmount, loading, error, addPayment, updatePayment, deletePayment } = useexpenses()
  const { user } = useAuth()
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ id: '', name: '', amount: '', category: '', date: '' })

  const resetForm = () => setForm({ id: '', name: '', amount: '', category: '', date: '' })
  const startAdd = () => { setEditingId('new'); resetForm() }
  const startEdit = (p) => { setEditingId(p.id); setForm({ id: p.id, name: p.name, amount: String(p.amount), category: p.category, date: p.date }) }
  const cancelEdit = () => { setEditingId(null); resetForm() }
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const isValid = () => {
    const amountNum = Number(form.amount)
    return form.name.trim() && form.category.trim() && !Number.isNaN(amountNum) && amountNum > 0 && form.date
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!isValid()) return
    const payload = { userId: String(user.id), name: form.name.trim(), category: form.category.trim(), amount: Number(form.amount), date: form.date }
    if (editingId === 'new') {
      await addPayment(payload)
    } else if (editingId) {
      await updatePayment(editingId, payload)
    }
    cancelEdit()
  }

  const remove = async (id) => { await deletePayment(id) }

  if (loading) return <div className="text-center my-4"><Spinner animation="border" /></div>
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Card className="shadow-sm">
      <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
        <span>Expense Management</span>
        <Button size="sm" onClick={startAdd}>Add Expense</Button>
      </Card.Header>
      <Card.Body>
        {editingId && (
          <Form onSubmit={submit} className="mb-3">
            <Row className="g-2">
              <Col md={4}><Form.Control name="name" value={form.name} onChange={change} placeholder="Name" required /></Col>
              <Col md={2}><Form.Control type="number" name="amount" value={form.amount} onChange={change} placeholder="Amount" required min="1" /></Col>
              <Col md={3}><Form.Control name="category" value={form.category} onChange={change} placeholder="Category" required /></Col>
              <Col md={3}><Form.Control type="date" name="date" value={form.date} onChange={change} placeholder="Date" required /></Col>
            </Row>
            <div className="mt-2 d-flex gap-2">
              <Button type="submit" disabled={!isValid()}>Save</Button>
              <Button variant="secondary" type="button" onClick={cancelEdit}>Cancel</Button>
            </div>
          </Form>
        )}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ width: 160 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length ? expenses.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(p.amount) || 0)}</td>
                <td>{p.category}</td>
                <td>{new Date(p.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    <Button size="sm" variant="warning" onClick={() => startEdit(p)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => remove(p.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center">No expenses found</td></tr>
            )}
          </tbody>
        </Table>
        <div className="text-end fw-bold">Total Amount: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</div>
      </Card.Body>
    </Card>
  )
}

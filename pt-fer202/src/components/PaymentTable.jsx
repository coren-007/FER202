 import { useState } from 'react'
 import { Table, Spinner, Alert, Card, Button, Form, Row, Col } from 'react-bootstrap'
 import { usePayments } from '../contexts/PaymentContext'

 export default function PaymentTable() {
   const { payments, totalAmount, loading, error, addPayment, updatePayment, deletePayment } = usePayments()
   const [editingId, setEditingId] = useState(null)
   const [form, setForm] = useState({ id: '', userId: '', semester: '', courseName: '', amount: '', date: '' })

   const resetForm = () => setForm({ id: '', userId: '', semester: '', courseName: '', amount: '', date: '' })
   const startAdd = () => { setEditingId('new'); resetForm() }
   const startEdit = (p) => { setEditingId(p.id); setForm({ ...p }) }
   const cancelEdit = () => { setEditingId(null); resetForm() }
   const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

   const submit = async (e) => {
     e.preventDefault()
     const payload = { userId: String(form.userId), semester: form.semester, courseName: form.courseName, amount: Number(form.amount), date: form.date }
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
         <span>Payments</span>
         <Button size="sm" onClick={startAdd}>Add Payment</Button>
       </Card.Header>
       <Card.Body>
         {editingId && (
           <Form onSubmit={submit} className="mb-3">
             <Row className="g-2">
               <Col md={2}><Form.Control name="userId" value={form.userId} onChange={change} placeholder="User ID" required /></Col>
               <Col md={2}><Form.Control name="semester" value={form.semester} onChange={change} placeholder="Semester" required /></Col>
               <Col md={3}><Form.Control name="courseName" value={form.courseName} onChange={change} placeholder="Course Name" required /></Col>
               <Col md={2}><Form.Control type="number" name="amount" value={form.amount} onChange={change} placeholder="Amount" required /></Col>
               <Col md={3}><Form.Control type="date" name="date" value={form.date} onChange={change} placeholder="Date" required /></Col>
             </Row>
             <div className="mt-2 d-flex gap-2">
               <Button type="submit">Save</Button>
               <Button variant="secondary" type="button" onClick={cancelEdit}>Cancel</Button>
             </div>
           </Form>
         )}

         <Table striped bordered hover responsive>
           <thead>
             <tr>
               <th>#</th>
               <th>User ID</th>
               <th>Course Name</th>
               <th>Semester</th>
               <th>Amount</th>
               <th>Date</th>
               <th style={{ width: 160 }}>Actions</th>
             </tr>
           </thead>
           <tbody>
             {payments.length ? payments.map(p => (
               <tr key={p.id}>
                 <td>{p.id}</td>
                 <td>{p.userId}</td>
                 <td>{p.courseName}</td>
                 <td>{p.semester}</td>
                 <td>{new Intl.NumberFormat('en-US').format(p.amount)}</td>
                 <td>{new Date(p.date).toLocaleDateString()}</td>
                 <td>
                   <div className="d-flex gap-2 justify-content-center">
                     <Button size="sm" variant="outline-primary" onClick={() => startEdit(p)}>Edit</Button>
                     <Button size="sm" variant="outline-danger" onClick={() => remove(p.id)}>Delete</Button>
                   </div>
                 </td>
               </tr>
             )) : (
               <tr><td colSpan={7} className="text-center">No payments found</td></tr>
             )}
           </tbody>
         </Table>
         <div className="text-end fw-bold">Total Amount: {new Intl.NumberFormat('en-US').format(totalAmount)}</div>
       </Card.Body>
     </Card>
   )
 }

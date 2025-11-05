import { useEffect, useState } from 'react'
import { Table, Spinner, Alert } from 'react-bootstrap'
import { api } from '../services/api'

export default function PaymentList({ filters, sortBy }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    applyFilterAndSort()
  }, [filters, sortBy])

  const load = async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/payments')
      setItems(data)
    } catch (e) {
      setError('Failed to fetch payments')
    } finally {
      setLoading(false)
    }
  }

  const applyFilterAndSort = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters?.semester) params.append('semester_like', filters.semester)
      if (filters?.courseName) params.append('courseName_like', filters.courseName)
      const { data } = await api.get(`/payments${params.toString() ? `?${params.toString()}` : ''}`)
      let list = data.slice()
      if (sortBy) {
        const [field, order] = sortBy.split('_')
        list.sort((a, b) => {
          if (field === 'date') {
            return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
          }
          if (field === 'amount') {
            return order === 'asc' ? a.amount - b.amount : b.amount - a.amount
          }
          const av = a[field] ?? ''
          const bv = b[field] ?? ''
          return order === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
        })
      }
      setItems(list)
    } catch (e) {
      setError('Failed to apply filters/sort')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="text-center my-4"><Spinner animation="border" /></div>
  )
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Course Name</th>
          <th>Semester</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.length ? items.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.courseName}</td>
            <td>{p.semester}</td>
            <td>${p.amount}</td>
            <td>{new Date(p.date).toLocaleDateString()}</td>
            <td><span className={`badge bg-${p.status === 'Paid' ? 'success' : 'warning'}`}>{p.status}</span></td>
          </tr>
        )) : (
          <tr><td colSpan={6} className="text-center">No payments found</td></tr>
        )}
      </tbody>
    </Table>
  )
}

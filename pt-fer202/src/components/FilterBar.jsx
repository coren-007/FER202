import { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function FilterBar({ onFilter, onSort }) {
  const [filters, setFilters] = useState({ semester: '', courseName: '' })

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    onFilter?.(filters)
  }

  return (
    <Form onSubmit={submit} className="mb-3 p-3 border rounded bg-light">
      <Row className="g-3">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Search by semester</Form.Label>
            <Form.Control name="semester" value={filters.semester} onChange={change} placeholder="e.g. Spring 2025" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by course name</Form.Label>
            <Form.Control name="courseName" value={filters.courseName} onChange={change} placeholder="e.g. Web Development" />
          </Form.Group>
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button type="submit" className="me-2">Apply Filters</Button>
          <div className="d-flex flex-wrap gap-2">
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('courseName_asc')}>Course A→Z</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('courseName_desc')}>Course Z→A</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('date_asc')}>Date ↑</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('date_desc')}>Date ↓</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('amount_asc')}>Amount ↑</Button>
            <Button size="sm" variant="outline-secondary" onClick={() => onSort?.('amount_desc')}>Amount ↓</Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

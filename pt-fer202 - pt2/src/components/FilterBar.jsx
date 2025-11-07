 import { useState } from 'react'
 import { Form, Row, Col, Button } from 'react-bootstrap'

 export default function FilterBar({ onFilter, onSort }) {
   const [filters, setFilters] = useState({ query: '', semester: '', course: '' })

   const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    onFilter?.(filters)
  }

  return (
    <Form onSubmit={submit} className="mb-4 p-3 border rounded bg-light">
      <Row className="g-3">
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
            <Form.Control name="query" value={filters.query} onChange={change} placeholder="Search by semester or course name" />
          </Form.Group>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Form.Group>
            <Form.Label>Lọc theo Semester</Form.Label>
            <Form.Control name="semester" value={filters.semester} onChange={change} placeholder="All Semesters" />
          </Form.Group>
        </Col>
        <Col xs={6} md={4} lg={2}>
          <Form.Group>
            <Form.Label>Lọc theo Course</Form.Label>
            <Form.Control name="course" value={filters.course} onChange={change} placeholder="All Courses" />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <Form.Group>
            <Form.Label>Sắp xếp theo:</Form.Label>
            <Form.Select onChange={(e) => onSort?.(e.target.value)} defaultValue="course_asc">
              <option value="course_asc">By Course name A-&gt;Z</option>
              <option value="course_desc">By Course name Z-&gt;A</option>
              <option value="date_asc">By Date ascending</option>
              <option value="date_desc">By Date descending</option>
              <option value="amount_asc">By Amount ascending</option>
              <option value="amount_desc">By Amount descending</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-3"><Button type="submit">Apply</Button></div>
    </Form>
  )
}

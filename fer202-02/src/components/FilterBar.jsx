 import { useState } from 'react'
 import { Form, Row, Col, Button } from 'react-bootstrap'

/**
 * Thanh lọc dữ liệu và sắp xếp cho danh sách expenses.
 * @param {{ onFilter?: (filters: {query:string, semester:string, course:string})=>void, onSort?: (sortBy:string)=>void }} props
 */
 export default function FilterBar({ onFilter, onSort }) {
   const [filters, setFilters] = useState({ category: '' })

  /**
   * Cập nhật giá trị filter theo input.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
   const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value })

  /**
   * Submit bộ lọc tới parent.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
   const submit = (e) => {
     e.preventDefault()
     onFilter?.(filters)
   }

  return (
    <Form onSubmit={submit} className="mb-4 p-3 border rounded bg-light">
      <Row className="g-3">
        <Col xs={12} lg={4}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control name="category" value={filters.category} onChange={change} placeholder="e.g., Food" />
          </Form.Group>
        </Col>
        <Col xs={12} md={4} lg={2}>
          <div className="mt-4"><Button type="submit">Apply</Button></div>
        </Col>
      </Row>
    </Form>
  )
}

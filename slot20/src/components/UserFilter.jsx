import { Row, Col, Form } from 'react-bootstrap'

/**
 * Bộ lọc danh sách người dùng: tìm kiếm, lọc theo role/status, sắp xếp.
 * @param {{
 *  filters: { query: string, role: string, status: string, sortBy: string },
 *  onChange: (partial: Partial<{query:string,role:string,status:string,sortBy:string}>)=>void
 * }} props
 */
export default function UserFilter({ filters, onChange }) {
  /** Trả về handler cập nhật một khóa filter. */
  const handle = (key) => (e) => onChange({ [key]: e.target.value })

  return (
    <Form className="mb-3">
      <Row className="g-2 align-items-end">
        <Col xs={12} md={4}>
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search username or full name"
            value={filters.query}
            onChange={handle('query')}
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Role</Form.Label>
          <Form.Select value={filters.role} onChange={handle('role')}>
            <option value="all">All</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Label>Status</Form.Label>
          <Form.Select value={filters.status} onChange={handle('status')}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4}>
          <Form.Label>Sort</Form.Label>
          <Form.Select value={filters.sortBy} onChange={handle('sortBy')}>
            <option value="username_asc">Username A → Z</option>
            <option value="username_desc">Username Z → A</option>
            <option value="fullName_asc">Full Name A → Z</option>
            <option value="fullName_desc">Full Name Z → A</option>
            <option value="role_asc">Role A → Z</option>
            <option value="role_desc">Role Z → A</option>
            <option value="status_asc">Status A → Z</option>
            <option value="status_desc">Status Z → A</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  )
}

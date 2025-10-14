import { Card, Form, Row, Col } from "react-bootstrap";

export default function Filter({ searchTerm, setSearchTerm, yearFilter, setYearFilter, sortBy, setSortBy }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Filter & Search</h5>
        <Row className="g-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Filter by Year</Form.Label>
              <Form.Select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
                <option value="all">All Years</option>
                <option value="<=2000">2000 and earlier</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">After 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Default</option>
                <option value="year-asc">Year ↑</option>
                <option value="year-desc">Year ↓</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑</option>
                <option value="duration-desc">Duration ↓</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

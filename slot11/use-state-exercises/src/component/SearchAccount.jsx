//ex6
import React, { useState } from 'react';
import { Form, Card, Row, Col, Badge } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'john_doe', password: '••••••', avatar: '👨‍💼' },
  { id: 2, username: 'jane_smith', password: '••••••', avatar: '👩‍💼' },
  { id: 3, username: 'mike_wilson', password: '••••••', avatar: '👨‍🔧' },
  { id: 4, username: 'sarah_jones', password: '••••••', avatar: '👩‍🎨' },
  { id: 5, username: 'david_brown', password: '••••••', avatar: '👨‍🚀' },
  { id: 6, username: 'emily_davis', password: '••••••', avatar: '👩‍🔬' },
];

function SearchAccount() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccounts = accounts.filter(account =>
    account.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">Exercise 6: Tìm Kiếm Account</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm theo username..."
            size="lg"
          />
        </Form.Group>
        
        {filteredAccounts.length > 0 ? (
          <Row>
            {filteredAccounts.map(account => (
              <Col key={account.id} xs={12} md={6} lg={4} className="mb-3">
                <Card className="h-100 shadow-sm hover-shadow">
                  <Card.Body className="text-center">
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                      {account.avatar}
                    </div>
                    <Card.Title className="mb-2">{account.username}</Card.Title>
                    <Badge bg="secondary" className="mb-2">ID: {account.id}</Badge>
                    <Card.Text className="text-muted">
                      Password: {account.password}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center text-muted py-5">
            <h5>Không tìm thấy kết quả</h5>
            <p>Vui lòng thử lại với từ khóa khác</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default SearchAccount;

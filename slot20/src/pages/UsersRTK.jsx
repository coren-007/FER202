import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap'
import NavigationHeader from '../components/NavigationHeader'
import { fetchUsers, toggleAdminStatus } from '../features/users/usersSlice'

export default function UsersRTK() {
  const dispatch = useDispatch()
  const { list, isLoading, error } = useSelector(state => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <>
      <NavigationHeader />
      <Container className="mt-3">
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">Users (Redux Toolkit)</h4>
              </Card.Header>
              <Card.Body>
                {isLoading && <div className="mb-3"><Spinner animation="border" size="sm" /> Loading...</div>}
                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>Total: {list.length}</div>
                  <Button variant="primary" onClick={() => dispatch(fetchUsers())}>Reload</Button>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full name</th>
                        <th>Admin</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map(u => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.username}</td>
                          <td>{u.fullName}</td>
                          <td>{u.admin ? 'Yes' : 'No'}</td>
                          <td>
                            <Button size="sm" variant={u.admin ? 'warning' : 'success'} onClick={() => dispatch(toggleAdminStatus(u.id))}>
                              Toggle Admin
                            </Button>
                          </td>
                        </tr>
                      ))}
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

import { Table, Button, Image, Spinner } from 'react-bootstrap'

export default function UserTable({ users, loading, onViewDetails, onBan, onUnban }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th style={{width: 80}}>ID</th>
          <th style={{width: 80}}>Avatar</th>
          <th>Username</th>
          <th>Full Name</th>
          <th style={{width: 120}}>Role</th>
          <th style={{width: 120}}>Status</th>
          <th style={{width: 220}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={7} className="text-center">
              <Spinner animation="border" size="sm" className="me-2" /> Loading...
            </td>
          </tr>
        )}
        {!loading && users.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center">No users found.</td>
          </tr>
        )}
        {!loading && users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>
              {u.avatar ? (
                <Image
                  src={u.avatar}
                  roundedCircle
                  width={40}
                  height={40}
                  alt={u.username}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/images/users/default.svg'
                  }}
                />
              ) : (
                <Image src={'/images/users/default.svg'} roundedCircle width={40} height={40} alt={u.username} />
              )}
            </td>
            <td>{u.username}</td>
            <td>{u.fullName}</td>
            <td><span className="badge bg-secondary text-uppercase">{u.role}</span></td>
            <td>
              <span className={`badge ${u.status === 'active' ? 'bg-success' : 'bg-danger'}`}>{u.status}</span>
            </td>
            <td>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button variant="info" size="sm" onClick={() => onViewDetails(u)}>View Details</Button>
                {u.status === 'locked' ? (
                  <Button variant="success" size="sm" onClick={() => onUnban && onUnban(u)}>Unban</Button>
                ) : (
                  <Button variant="warning" size="sm" onClick={() => onBan(u)}>Ban Account</Button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

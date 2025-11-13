import { useEffect, useMemo, useReducer } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import NavigationHeader from '../components/NavigationHeader'
import UserFilter from '../components/UserFilter'
import UserTable from '../components/UserTable'
import ConfirmModal from '../components/ConfirmModal'
import { getUsers, updateUserApi } from '../services/api'

/**
 * Trang quản lý người dùng: tải danh sách, lọc/sắp xếp, xem chi tiết, khóa/mở khóa tài khoản.
 */
const initialState = {
  users: [],
  isLoading: false,
  error: null,
  filters: { query: '', role: 'all', status: 'all', sortBy: 'username_asc' },
  modal: { show: false, title: '', message: '' }
}

/** Reducer quản lý state trang Users. */
function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null }
    case 'LOAD_SUCCESS':
      return { ...state, isLoading: false, users: action.payload }
    case 'LOAD_FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SHOW_MODAL':
      return { ...state, modal: { show: true, title: action.title, message: action.message } }
    case 'HIDE_MODAL':
      return { ...state, modal: { show: false, title: '', message: '' } }
    default:
      return state
  }
}

/**
 * Component chính của trang Users.
 */
export default function UserList() {
  const [state, dispatch] = useReducer(reducer, initialState)

  /** Tải danh sách người dùng khi mount. */
  useEffect(() => {
    const load = async () => {
      dispatch({ type: 'LOAD_START' })
      try {
        const data = await getUsers()
        dispatch({ type: 'LOAD_SUCCESS', payload: data })
      } catch (e) {
        dispatch({ type: 'LOAD_FAILURE', payload: 'Failed to load users' })
      }
    }
    load()
  }, [])

  /** Lọc/sắp xếp theo bộ lọc hiện tại. */
  const filtered = useMemo(() => {
    let list = state.users.slice()
    const { query, role, status, sortBy } = state.filters
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(u =>
        String(u.username||'').toLowerCase().includes(q) ||
        String(u.fullName||'').toLowerCase().includes(q)
      )
    }
    if (role !== 'all') list = list.filter(u => u.role === role)
    if (status !== 'all') list = list.filter(u => u.status === status)

    if (sortBy) {
      const [field, order] = sortBy.split('_')
      list.sort((a, b) => {
        const get = (obj) => String(obj[field] || '').toLowerCase()
        return order === 'asc' ? get(a).localeCompare(get(b)) : get(b).localeCompare(get(a))
      })
    }
    return list
  }, [state.users, state.filters])

  /** Cập nhật bộ lọc từ input con. */
  const handleFilter = (payload) => dispatch({ type: 'SET_FILTERS', payload })

  /** Hiển thị modal chi tiết người dùng. */
  const handleViewDetails = (user) => {
    const lines = [
      `ID: ${user.id}`,
      `Username: ${user.username}`,
      `Full name: ${user.fullName}`,
      `Role: ${user.role}`,
      `Status: ${user.status}`
    ]
    dispatch({ type: 'SHOW_MODAL', title: 'User Details', message: lines.join('\n') })
  }

  /** Khóa tài khoản người dùng. */
  const handleBanAccount = async (user) => {
    if (user.status === 'locked') {
      dispatch({ type: 'SHOW_MODAL', title: 'Thông báo', message: 'Tài khoản đã bị khóa trước đó.' })
      return
    }
    try {
      const updated = await updateUserApi(user.id, { status: 'locked' })
      dispatch({ type: 'LOAD_SUCCESS', payload: state.users.map(u => u.id === user.id ? updated : u) })
      dispatch({ type: 'SHOW_MODAL', title: 'Thành công', message: 'Đã khóa tài khoản.' })
    } catch (e) {
      dispatch({ type: 'SHOW_MODAL', title: 'Lỗi', message: 'Không thể cập nhật tài khoản.' })
    }
  }

  /** Mở khóa tài khoản người dùng. */
  const handleUnbanAccount = async (user) => {
    if (user.status === 'active') {
      dispatch({ type: 'SHOW_MODAL', title: 'Thông báo', message: 'Tài khoản đang ở trạng thái hoạt động.' })
      return
    }
    try {
      const updated = await updateUserApi(user.id, { status: 'active' })
      dispatch({ type: 'LOAD_SUCCESS', payload: state.users.map(u => u.id === user.id ? updated : u) })
      dispatch({ type: 'SHOW_MODAL', title: 'Thành công', message: 'Đã mở khóa tài khoản.' })
    } catch (e) {
      dispatch({ type: 'SHOW_MODAL', title: 'Lỗi', message: 'Không thể cập nhật tài khoản.' })
    }
  }

  return (
    <>
      <NavigationHeader />
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h4 className="mb-0">User Management</h4>
              </Card.Header>
              <Card.Body>
                {state.error && (<Alert variant="danger" className="mb-3">{state.error}</Alert>)}
                <UserFilter filters={state.filters} onChange={handleFilter} />
                <UserTable
                  users={filtered}
                  loading={state.isLoading}
                  onViewDetails={handleViewDetails}
                  onBan={handleBanAccount}
                  onUnban={handleUnbanAccount}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ConfirmModal
        show={state.modal.show}
        title={state.modal.title}
        message={state.modal.message}
        onHide={() => dispatch({ type: 'HIDE_MODAL' })}
      />
    </>
  )
}

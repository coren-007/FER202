 import axios from 'axios'

/**
 * Axios instance cấu hình sẵn cho JSON Server.
 * baseURL: http://localhost:3001
 */
export const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
})

// Users
/**
 * Lấy toàn bộ users.
 */
export const getUsers = async () => {
  const res = await API.get('/users')
  return res.data
}

/**
 * Truy vấn users với tham số lọc.
 */
export const queryUsers = async (params = {}) => {
  const res = await API.get('/users', { params })
  return res.data
}

/**
 * Cập nhật từng phần thông tin user.
 */
export const updateUserApi = async (id, payload) => {
  const res = await API.patch(`/users/${id}`, payload)
  return res.data
}

// expenses CRUD
/**
 * Lấy danh sách expenses với params (nếu có).
 */
export const getexpenses = async (params = {}) => {
  const res = await API.get('/expenses', { params })
  return res.data
}

/**
 * Tạo payment mới.
 */
export const addPaymentApi = async (payload) => {
  const res = await API.post('/expenses', payload)
  return res.data
}

/**
 * Cập nhật toàn bộ payment theo id.
 */
export const updatePaymentApi = async (id, payload) => {
  const res = await API.put(`/expenses/${id}`, payload)
  return res.data
}

/**
 * Xóa payment theo id.
 */
export const deletePaymentApi = async (id) => {
  const res = await API.delete(`/expenses/${id}`)
  return res.data
}

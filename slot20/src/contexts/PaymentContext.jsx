import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { getPayments, addPaymentApi, updatePaymentApi, deletePaymentApi } from '../services/api'

/**
 * PaymentContext quản lý danh sách khoản thu/chi học phí, filter, sort và tổng số tiền.
 * Cung cấp các thao tác CRUD (fetch/add/update/delete) và các setter cho filters/sort.
 */
const PaymentContext = createContext()

/**
 * Trạng thái khởi tạo PaymentContext
 * - payments: danh sách khoản thanh toán
 * - filters: bộ lọc (học kỳ, môn học, tìm kiếm)
 * - sortBy: tiêu chí sắp xếp (vd: course_asc, date_desc)
 * - totalAmount: tổng số tiền hiện tại
 * - isLoading: trạng thái tải dữ liệu
 * - error: thông báo lỗi nếu có
 */
const initialState = {
  payments: [],
  filters: { semester: '', course: '', search: '' },
  sortBy: 'course_asc',
  totalAmount: 0,
  isLoading: false,
  error: null
}

/**
 * Reducer quản lý các action liên quan đến payment
 * Action types:
 * - LOAD_START | LOAD_SUCCESS | LOAD_FAILURE
 * - SET_FILTERS | SET_SORT
 * - ADD_SUCCESS | UPDATE_SUCCESS | DELETE_SUCCESS
 */
function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, isLoading: true, error: null }
    case 'LOAD_SUCCESS': {
      const total = action.payload.reduce((s, p) => s + (Number(p.amount) || 0), 0)
      return { ...state, isLoading: false, payments: action.payload, totalAmount: total }
    }
    case 'LOAD_FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_SORT':
      return { ...state, sortBy: action.payload }
    case 'ADD_SUCCESS': {
      const list = [...state.payments, action.payload]
      const total = list.reduce((s, p) => s + (Number(p.amount) || 0), 0)
      return { ...state, payments: list, totalAmount: total }
    }
    case 'UPDATE_SUCCESS': {
      const list = state.payments.map(p => p.id === action.payload.id ? action.payload : p)
      const total = list.reduce((s, p) => s + (Number(p.amount) || 0), 0)
      return { ...state, payments: list, totalAmount: total }
    }
    case 'DELETE_SUCCESS': {
      const list = state.payments.filter(p => p.id !== action.payload)
      const total = list.reduce((s, p) => s + (Number(p.amount) || 0), 0)
      return { ...state, payments: list, totalAmount: total }
    }
    default:
      return state
  }
}

/**
 * Provider cung cấp ngữ cảnh payments cho cây component bên dưới.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function PaymentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Lấy danh sách payments với filter/sort phía client.
   * @param {{ query?: string, semester?: string, course?: string, sortBy?: string }} [options]
   */
  const fetchPayments = async ({ query, semester, course, sortBy } = {}) => {
    try {
      dispatch({ type: 'LOAD_START' })
      const params = {}
      if (query) params.q = query
      if (semester) params.semester_like = semester
      if (course) params.courseName_like = course
      const data = await getPayments(params)

      let list = data.slice()
      const sort = sortBy || state.sortBy
      if (sort) {
        const [field, order] = sort.split('_')
        list.sort((a, b) => {
          if (field === 'date') {
            return order === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
          }
          if (field === 'amount') {
            return order === 'asc' ? a.amount - b.amount : b.amount - a.amount
          }
          const map = { course: 'courseName' }
          const f = map[field] || field
          return order === 'asc' ? String(a[f]||'').localeCompare(String(b[f]||'')) : String(b[f]||'').localeCompare(String(a[f]||''))
        })
      }

      dispatch({ type: 'LOAD_SUCCESS', payload: list })
    } catch (e) {
      dispatch({ type: 'LOAD_FAILURE', payload: 'Failed to fetch payments' })
    }
  }

  /**
   * Tạo payment mới.
   * @param {object} payload - dữ liệu payment
   */
  const addPayment = async (payload) => {
    const created = await addPaymentApi(payload)
    dispatch({ type: 'ADD_SUCCESS', payload: created })
  }

  /**
   * Cập nhật payment theo id.
   * @param {number|string} id
   * @param {object} payload
   */
  const updatePayment = async (id, payload) => {
    const updated = await updatePaymentApi(id, payload)
    dispatch({ type: 'UPDATE_SUCCESS', payload: updated })
  }

  /**
   * Xóa payment theo id.
   * @param {number|string} id
   */
  const deletePayment = async (id) => {
    await deletePaymentApi(id)
    dispatch({ type: 'DELETE_SUCCESS', payload: id })
  }

  /** Cập nhật bộ lọc. */
  const setFilters = (filters) => dispatch({ type: 'SET_FILTERS', payload: filters })

  /** Cập nhật tiêu chí sắp xếp. */
  const setSort = (sort) => dispatch({ type: 'SET_SORT', payload: sort })

  useEffect(() => { fetchPayments() }, [])

  /** Giá trị cung cấp cho context consumer. */
  const value = useMemo(() => ({
    payments: state.payments,
    totalAmount: state.totalAmount,
    filters: state.filters,
    sortBy: state.sortBy,
    loading: state.isLoading,
    error: state.error,
    fetchPayments,
    addPayment,
    updatePayment,
    deletePayment,
    setFilters,
    setSort
  }), [state])

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  )
}

/**
 * Hook truy cập nhanh PaymentContext.
 */
export const usePayments = () => useContext(PaymentContext)

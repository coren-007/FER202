import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { addPaymentApi, updatePaymentApi } from '../../services/api'

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await addPaymentApi(payload)
      return data
    } catch (err) {
      const status = err?.response?.status
      if (status === 402) return rejectWithValue('Tài khoản không đủ tiền')
      return rejectWithValue(err?.message || 'Create payment failed')
    }
  }
)

export const refundPayment = createAsyncThunk(
  'payments/refundPayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      const data = await updatePaymentApi(paymentId, { status: 'REFUNDED' })
      return data
    } catch (err) {
      return rejectWithValue(err?.message || 'Refund failed')
    }
  }
)

const initialState = { list: [], isLoading: false, error: null }

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.list.push(action.payload)
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error?.message || 'Create payment failed'
      })
      .addCase(refundPayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refundPayment.fulfilled, (state, action) => {
        state.isLoading = false
        const idx = state.list.findIndex(p => p.id === action.payload.id)
        if (idx !== -1) state.list[idx] = action.payload
      })
      .addCase(refundPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error?.message || 'Refund failed'
      })
  }
})

export const selectPayments = (state) => state.payments.list
export const selectSuccessfulPayments = createSelector(
  [selectPayments],
  (payments) => payments.filter(p => p.status === 'SUCCESS')
)

export default paymentsSlice.reducer

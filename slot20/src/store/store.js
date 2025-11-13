import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import paymentsReducer from '../features/payments/paymentsSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    payments: paymentsReducer
  }
})

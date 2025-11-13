# TuitionTracker (pt-fer202)

- React + Vite app
- Uses Context + useReducer, axios, react-bootstrap, react-router-dom, react-icons
- Redux Toolkit integration (users/payments)
- JSON Server mock backend (db-pt2.json)

## Scripts
- npm run server  -> json-server --watch db-pt2.json --port 3001
- npm start     -> start app at http://localhost:3000

## Setup
- npm i
- npm i @reduxjs/toolkit react-redux reselect

## Redux Toolkit (Users/Payments)
- Store: `src/store/store.js` (reducers: `users`, `payments`)
- Provider: bọc `<Provider store={store}>` trong `src/index.jsx`.

### Users (RTK)
- Slice: `src/features/users/usersSlice.js`
- State: `{ list: [], isLoading: false, error: null }`
- Thunk: `fetchUsers` -> GET `/users`
- Reducer đồng bộ: `toggleAdminStatus(userId)`
- Demo page: `/rtk-users`

### Payments (RTK)
- Slice: `src/features/payments/paymentsSlice.js`
- Thunk ghi: `createPayment` -> POST `/payments`
  - Nếu API trả 402: `rejectWithValue('Tài khoản không đủ tiền')`
- Thunk khác: `refundPayment` -> PUT `/payments/:id` với `{ status: 'REFUNDED' }`
- Selector: `selectSuccessfulPayments` (lọc `status === 'SUCCESS'`)
- Demo page: `/rtk-payments`

## API
- Base URL: http://localhost:3001
- Service: `src/services/api.js`

## Test account
- username: student1
- email: student1@example.com
- password: password123

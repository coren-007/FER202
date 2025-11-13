# TuitionTracker (pt-fer202)

- React + Vite app
- Uses Context + useReducer, axios, react-bootstrap, react-router-dom, react-icons
- JSON Server mock backend (db-pt2.json)

## Scripts
- npm run server  -> json-server --watch db-pt2.json --port 3001
- npm start     -> start app at http://localhost:3000

## Test account
- username: student1
- email: student1@example.com
- password: password123

## Quy ước chú thích (tiếng Việt + JSDoc)

- **Mục tiêu**: Dễ tìm kiếm, đọc hiểu và tái sử dụng code nhanh.
- **Phong cách**: Viết JSDoc ngắn gọn bằng tiếng Việt ngay trên component/hàm, kèm mô tả input/output chính.
- **Phạm vi**:
  - Component/Trang: mô tả mục đích, props chính, handlers quan trọng.
  - Context/Service: mô tả state ban đầu, action/reducer, API endpoints và tham số.
  - Route/Guard: mô tả sơ đồ route, điều kiện bảo vệ, props.
- **Không lạm dụng**: Tránh chú thích những đoạn code tự mô tả (vd: setState đơn giản) để giảm nhiễu.

### Ví dụ mẫu

```jsx
/**
 * Route bảo vệ: chỉ render `children` khi đã đăng nhập, ngược lại chuyển hướng về /login.
 * @param {{ children: import('react').ReactNode }} props
 */
export default function PrivateRoute({ children }) { /* ... */ }
```

```js
/**
 * Axios instance cấu hình sẵn cho JSON Server.
 * baseURL: http://localhost:3001
 */
export const API = axios.create({ /* ... */ })
```

```jsx
/**
 * Form đăng nhập: kiểm tra hợp lệ cơ bản, gọi `login` từ AuthContext và hiển thị thông báo.
 */
function LoginForm() { /* ... */ }

 import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/**
 * Điểm khởi động ứng dụng React: mount App vào phần tử #root.
 */
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

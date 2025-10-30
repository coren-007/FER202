import React from 'react';
import './PageStyles.css';

function Home() {
  return (
    <div className="page-container">
      <h1>🏠 Trang Chủ</h1>
      <div className="content">
        <p>Chào mừng bạn đến với ứng dụng React Router!</p>
        <p>Đây là bài tập 1: <strong>Routing Cơ Bản và Điều Hướng</strong></p>
        
        <div className="info-box">
          <h3>Tính năng đã triển khai:</h3>
          <ul>
            <li>✅ Định nghĩa Routes cơ bản với path và element</li>
            <li>✅ Sử dụng NavLink để điều hướng</li>
            <li>✅ Highlight trang hiện tại với class 'active'</li>
            <li>✅ Responsive navigation bar</li>
          </ul>
        </div>

        <div className="highlight-box">
          <p>💡 <strong>Hãy thử:</strong> Click vào các link trên thanh điều hướng để xem URL thay đổi mà không tải lại trang!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;

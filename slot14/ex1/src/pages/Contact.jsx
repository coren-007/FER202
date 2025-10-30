import React from 'react';
import './PageStyles.css';

function Contact() {
  return (
    <div className="page-container">
      <h1>📧 Trang Liên Hệ</h1>
      <div className="content">
        <p>Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn!</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>📍 Địa chỉ</h3>
            <p>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh</p>
          </div>
          
          <div className="contact-item">
            <h3>📞 Điện thoại</h3>
            <p>Hotline: 1900 123 456</p>
            <p>Hỗ trợ: 0909 123 456</p>
          </div>
          
          <div className="contact-item">
            <h3>✉️ Email</h3>
            <p>support@example.com</p>
            <p>info@example.com</p>
          </div>
          
          <div className="contact-item">
            <h3>🕒 Giờ làm việc</h3>
            <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
            <p>Thứ 7: 8:00 - 12:00</p>
            <p>Chủ nhật: Nghỉ</p>
          </div>
        </div>

        <div className="highlight-box">
          <p>💬 <strong>Gợi ý:</strong> Bạn có thể mở rộng trang này bằng cách thêm form liên hệ với các trường nhập liệu!</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;

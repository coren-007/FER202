import React from 'react';
import './PageStyles.css';

function Products() {
  const products = [
    { id: 1, name: 'Laptop Dell XPS 15', price: '35.000.000 VNĐ' },
    { id: 2, name: 'iPhone 15 Pro Max', price: '32.000.000 VNĐ' },
    { id: 3, name: 'Samsung Galaxy S24', price: '25.000.000 VNĐ' },
    { id: 4, name: 'iPad Pro M2', price: '28.000.000 VNĐ' },
  ];

  return (
    <div className="page-container">
      <h1>📦 Trang Sản Phẩm</h1>
      <div className="content">
        <p>Danh sách các sản phẩm công nghệ hàng đầu</p>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">{product.price}</p>
              <button className="btn-view">Xem chi tiết</button>
            </div>
          ))}
        </div>

        <div className="info-box">
          <p>Chức năng "Xem chi tiết" sẽ được triển khai sau.</p>
        </div>
      </div>
    </div>
  );
}

export default Products;

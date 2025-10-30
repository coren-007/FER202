import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Route cơ bản - khớp với URL chính xác */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          
          {/* Route 404 - khớp với mọi URL không được định nghĩa */}
          <Route path="*" element={
            <div className="page-container">
              <h1>404 - Không tìm thấy trang</h1>
              <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;

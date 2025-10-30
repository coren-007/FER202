import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🚀</span>
          <span className="brand-text">React Router App</span>
        </div>
        
        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">🏠</span>
            Trang Chủ
          </NavLink>
          
          <NavLink 
            to="/san-pham"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">📦</span>
            Sản Phẩm
          </NavLink>
          
          <NavLink 
            to="/lien-he"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            <span className="nav-icon">📧</span>
            Liên Hệ
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

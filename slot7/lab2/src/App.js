// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">Pizza House</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
            </ul>
            <div className="d-flex">
              <input className="form-control search-input me-2" type="search" placeholder="Search" />
              <button className="btn btn-search" type="button">
                <svg width="16" height="16" fill="white" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <img src="/images/hero-pizza.jpg" alt="Neapolitan Pizza" />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1 className="hero-title">Neapolitan Pizza</h1>
          <p className="hero-description">If you are looking for a traditional Italian pizza, the Neapolitan is the best option!</p>
        </div>
        <button className="carousel-control-prev-btn">‹</button>
        <button className="carousel-control-next-btn">›</button>
      </div>

      {/* Our Menu */}
      <div className="menu-section">
        <div className="container">
          <h2 className="section-title">Our Menu</h2>
          <div className="row g-4">
            {/* Margherita Pizza */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="pizza-card">
                <div className="pizza-image-wrapper">
                  <span className="badge-sale">SALE</span>
                  <img src="/images/margherita.jpg" className="pizza-image" alt="Margherita Pizza" />
                </div>
                <div className="pizza-info">
                  <h5 className="pizza-name">Margherita Pizza</h5>
                  <p className="pizza-price">
                    <span className="price-old">$40.00</span> $24.00
                  </p>
                  <button className="btn-buy">Buy</button>
                </div>
              </div>
            </div>

            {/* Mushroom Pizza */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="pizza-card">
                <div className="pizza-image-wrapper">
                  <img src="/images/mushroom.jpg" className="pizza-image" alt="Mushroom Pizza" />
                </div>
                <div className="pizza-info">
                  <h5 className="pizza-name">Mushroom Pizza</h5>
                  <p className="pizza-price">$25.00</p>
                  <button className="btn-buy">Buy</button>
                </div>
              </div>
            </div>

            {/* Hawaiian Pizza */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="pizza-card">
                <div className="pizza-image-wrapper">
                  <span className="badge-new">NEW</span>
                  <img src="/images/hawaiian.jpg" className="pizza-image" alt="Hawaiian Pizza" />
                </div>
                <div className="pizza-info">
                  <h5 className="pizza-name">Hawaiian Pizza</h5>
                  <p className="pizza-price">$30.00</p>
                  <button className="btn-buy">Buy</button>
                </div>
              </div>
            </div>

            {/* Pesto Pizza */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="pizza-card">
                <div className="pizza-image-wrapper">
                  <span className="badge-sale">SALE</span>
                  <img src="/images/pesto.jpg" className="pizza-image" alt="Pesto Pizza" />
                </div>
                <div className="pizza-info">
                  <h5 className="pizza-name">Pesto Pizza</h5>
                  <p className="pizza-price">
                    <span className="price-old">$60.00</span> $30.00
                  </p>
                  <button className="btn-buy">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Your Table */}
      <div className="booking-section">
        <div className="container">
          <h2 className="section-title">Book Your Table</h2>
          <div className="booking-form">
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-4">
                <input type="text" className="form-control booking-input" placeholder="Your Name *" />
              </div>
              <div className="col-12 col-md-4">
                <input type="email" className="form-control booking-input" placeholder="Your Email *" />
              </div>
              <div className="col-12 col-md-4">
                <select className="form-select booking-input">
                  <option>Select a Service</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <textarea className="form-control booking-textarea" rows="5" placeholder="Please write your comment"></textarea>
            </div>
            <button className="btn-send-message">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
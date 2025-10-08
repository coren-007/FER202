import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import các trang
import FooterPage from './components/pages/FooterPage';
import HomePage from './components/pages/HomePage'; // Thêm trang HomeCarousel

function App() {
  return (
    <div className="App">
      {/* Trang giới thiệu phim (HomeCarousel) */}
      <HomePage />

      {/* Footer chứa thông tin của MinhLe */}
      <FooterPage />
    </div>
  );
}

export default App;

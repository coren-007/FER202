import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AccountPage from "./pages/AccountPage";
import FooterPage from "./pages/FooterPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <FooterPage />
  </BrowserRouter>
);

export default App;
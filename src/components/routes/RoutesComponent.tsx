import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "src/elements/Header";
import "src/styles/main.css";
import HomePage from "src/components/pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import AboutPage from "../pages/AboutPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

function RoutesComponent() {
  return (
    <header>
      <Router>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </header>
  );
}

export default RoutesComponent;

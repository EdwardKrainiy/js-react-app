import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "src/elements/Header";
import "src/styles/main.css";
import HomePage from "src/components/pages/HomePage";
import Footer from "@/elements/Footer";
import ROUTES from "@/constants/routes";
import ProductsPage from "../pages/ProductsPage";
import AboutPage from "../pages/AboutPage";
import "src/components/routes/routesComponent.scss";
import ProfilePage from "../pages/ProfilePage";

function RoutesComponent() {
  return (
    <div className="routes-component-container">
      <Router>
        <header>
          <Header />
        </header>
        <Routes>
          <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
          <Route path={ROUTES.PRODUCTS_PAGE} element={<ProductsPage />} />
          <Route path={ROUTES.ABOUT_PAGE} element={<AboutPage />} />
          <Route path={ROUTES.PROFILE_PAGE} element={<ProfilePage />} />
          <Route path={ROUTES.OTHER_PAGE} element={<Navigate to={ROUTES.HOME_PAGE} />} />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
  );
}

export default RoutesComponent;

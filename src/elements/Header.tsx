import { NavLink } from "react-router-dom";
import "./header.scss";

function Header() {
  const getProperActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "header-link active-link" : "header-link";

  return (
    <div className="header-div">
      <div className="header-text">
        <p>Sigma Games</p>
      </div>
      <nav>
        <NavLink to="/home" className={getProperActiveClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={getProperActiveClass}>
          Products
        </NavLink>
        <NavLink to="/about" className={getProperActiveClass}>
          About
        </NavLink>
        <NavLink to="/sign-in" className={getProperActiveClass}>
          Sign In
        </NavLink>
        <NavLink to="/sign-up" className={getProperActiveClass}>
          Sign Up
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;

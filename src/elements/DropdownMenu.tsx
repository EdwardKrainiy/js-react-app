import { useState, useEffect } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import "./header.scss";
import "./dropdownMenu.scss";

function DropDownMenu() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [searchParams] = useSearchParams();
  const [groupTerm, setGroupTerm] = useState(searchParams.get("platform") ?? "");

  const location = useLocation();

  const getProperActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "header-link active-link dropdown-menu-link" : "header-link";

  const changeCategory = (value: string) => {
    setGroupTerm(value);
  };

  useEffect(() => {
    setGroupTerm(searchParams.get("platform") ?? "");
  }, [location.search]);

  return (
    <div className="header-link-container">
      <NavLink
        to="/products"
        className={getProperActiveClass}
        onMouseEnter={() => setIsMenuOpened(true)}
        onMouseLeave={() => setIsMenuOpened(false)}
      >
        Products ↓
      </NavLink>
      {isMenuOpened ? (
        <div
          className="dropdown-menu"
          onMouseEnter={() => setIsMenuOpened(true)}
          onMouseLeave={() => setIsMenuOpened(false)}
        >
          <NavLink
            to="/products?platform=PC"
            className={`dropdown-menu-text ${groupTerm === "PC" ? "active-dropdown-link" : ""}`}
            onClick={() => changeCategory("PC")}
          >
            <span className={`${groupTerm === "PC" ? "active-dropdown-link" : ""}`}>PC</span>
          </NavLink>
          <NavLink
            to="/products?platform=XBox"
            className={`dropdown-menu-text ${groupTerm === "XBox" ? "active-dropdown-link" : ""}`}
            onClick={() => changeCategory("XBox")}
          >
            <span className={`${groupTerm === "XBox" ? "active-dropdown-link" : ""}`}>XBox</span>
          </NavLink>
          <NavLink
            to="/products?platform=PlayStation"
            className={`dropdown-menu-text ${groupTerm === "PlayStation" ? "active-dropdown-link" : ""}`}
            onClick={() => changeCategory("PlayStation")}
          >
            <span className={`${groupTerm === "PlayStation" ? "active-dropdown-link" : ""}`}>PlayStation</span>
          </NavLink>
        </div>
      ) : null}
    </div>
  );
}

export default DropDownMenu;

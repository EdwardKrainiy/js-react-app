import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useCallback, useState } from "react";
import setLocalStorageItem from "@/util/SetLocalStorageItem";
import DropDownMenu from "./DropdownMenu";
import ModalWindow from "./ModalWindow";

function Header() {
  const [isSignInModalWindowOpened, setIsSignInModalWindowOpened] = useState(false);
  const [isSignUpModalWindowOpened, setIsSignUpModalWindowOpened] = useState(false);
  const navigate = useNavigate();

  const setLogin = useCallback((login: string) => {
    setLocalStorageItem("userLogin", login);
  }, []);

  const closeSignInWindow = useCallback(() => {
    setIsSignInModalWindowOpened(false);
  }, []);

  const openSignInWindow = useCallback(() => {
    setIsSignInModalWindowOpened(true);
  }, []);

  const closeSignUpWindow = useCallback(() => {
    setIsSignUpModalWindowOpened(false);
  }, []);

  const openSignUpWindow = useCallback(() => {
    setIsSignUpModalWindowOpened(true);
  }, []);

  const getProperActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "header-link active-link" : "header-link";

  const logOut = () => {
    window.location.reload();
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessToken");
  };

  const navigateToProfilePage = () => {
    navigate("/profile");
  };

  return (
    <div className="header-div">
      <div className="header-text">
        <p>Sigma Games</p>
      </div>
      <nav className="header-nav">
        <NavLink to="/home" className={getProperActiveClass} tabIndex={0}>
          Home
        </NavLink>
        <DropDownMenu />
        <NavLink to="/about" className={getProperActiveClass}>
          About
        </NavLink>
        {localStorage.getItem("accessToken") ? (
          <div className="header-link" role="button" tabIndex={0} onMouseDown={navigateToProfilePage}>
            {localStorage.getItem("userLogin")}
          </div>
        ) : (
          <div className="header-link" role="button" tabIndex={0} onMouseDown={openSignInWindow}>
            <ModalWindow
              isModalWindowOpened={isSignInModalWindowOpened}
              onCloseModal={closeSignInWindow}
              modalTitle="Sign in"
              modalType="sign-in"
              setUserLogin={setLogin}
            />
            Sign in
          </div>
        )}
        {localStorage.getItem("accessToken") ? (
          <div className="header-link" role="button" tabIndex={0} onMouseDown={logOut}>
            Log out
          </div>
        ) : (
          <div className="header-link" role="button" tabIndex={0} onMouseDown={openSignUpWindow}>
            <ModalWindow
              isModalWindowOpened={isSignUpModalWindowOpened}
              onCloseModal={closeSignUpWindow}
              modalTitle="Sign up"
              modalType="sign-up"
              setUserLogin={setLogin}
            />
            Sign up
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;

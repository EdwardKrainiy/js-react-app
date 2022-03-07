import { NavLink, useNavigate } from "react-router-dom";
import "./header.scss";
import { useCallback, useState, useMemo } from "react";
import setLocalStorageItem from "@/util/SetLocalStorageItem";
import ModalWindowContext from "@/util/ModalWindowContext";
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

  const signInContext = useMemo(
    () => ({
      isModalWindowOpened: isSignInModalWindowOpened,
      onCloseModal: closeSignInWindow,
      modalTitle: "Sign in",
      modalType: "sign-in",
      setUserLogin: setLogin,
    }),
    [isSignInModalWindowOpened]
  );

  const signUpContext = useMemo(
    () => ({
      isModalWindowOpened: isSignUpModalWindowOpened,
      onCloseModal: closeSignUpWindow,
      modalTitle: "Sign up",
      modalType: "sign-up",
      setUserLogin: setLogin,
    }),
    [isSignUpModalWindowOpened]
  );

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
          <ModalWindowContext.Provider value={signInContext}>
            <div className="header-link" role="button" tabIndex={0} onMouseDown={openSignInWindow}>
              <ModalWindow />
              Sign in
            </div>
          </ModalWindowContext.Provider>
        )}
        {localStorage.getItem("accessToken") ? (
          <div className="header-link" role="button" tabIndex={0} onMouseDown={logOut}>
            Log out
          </div>
        ) : (
          <ModalWindowContext.Provider value={signUpContext}>
            <div className="header-link" role="button" tabIndex={0} onMouseDown={openSignUpWindow}>
              <ModalWindow />
              Sign up
            </div>
          </ModalWindowContext.Provider>
        )}
      </nav>
    </div>
  );
}

export default Header;

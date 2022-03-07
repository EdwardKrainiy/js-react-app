import ModalWindow from "@/elements/ModalWindow";
import setLocalStorageItem from "@/util/SetLocalStorageItem";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigation = useNavigate();

  const closeSignInWindow = useCallback(() => {
    navigation("/home");
  }, []);

  const setLogin = useCallback((login: string) => {
    setLocalStorageItem("userLogin", login);
  }, []);

  return (
    <div className="page-wrapper">
      {localStorage.getItem("accessToken") ? null : (
        <ModalWindow
          modalTitle="Sign in"
          setUserLogin={setLogin}
          isModalWindowOpened
          modalType="sign-in"
          onCloseModal={closeSignInWindow}
        />
      )}
      <p>About page</p>
    </div>
  );
}

export default AboutPage;

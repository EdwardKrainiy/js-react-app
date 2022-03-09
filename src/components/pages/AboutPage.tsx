import ModalWindow from "@/elements/ModalWindow";
import ModalWindowContext from "@/util/ModalWindowContext";
import setLocalStorageItem from "@/util/SetLocalStorageItem";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const navigation = useNavigate();

  const closeSignInWindow = useCallback(() => {
    navigation("/home");
  }, []);

  const setLogin = useCallback((login: string) => {
    setLocalStorageItem("userLogin", login);
  }, []);

  const signInModalContext = useMemo(
    () => ({
      isModalWindowOpened: true,
      onCloseModal: closeSignInWindow,
      modalTitle: "Sign in",
      modalType: "sign-in",
      setUserLogin: setLogin,
    }),
    []
  );

  return (
    <div className="page-wrapper">
      {localStorage.getItem("accessToken") ? null : (
        <ModalWindowContext.Provider value={signInModalContext}>
          <ModalWindow />
        </ModalWindowContext.Provider>
      )}
      <p>About page</p>
    </div>
  );
}

export default AboutPage;

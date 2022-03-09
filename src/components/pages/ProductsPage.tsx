import ModalWindow from "@/elements/ModalWindow";
import ProductsContent from "@/elements/ProductsContent";
import "src/components/pages/page.scss";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import setLocalStorageItem from "@/util/SetLocalStorageItem";
import ModalWindowContext from "@/util/ModalWindowContext";

function ProductsPage() {
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
      {localStorage.getItem("accessToken") ? (
        <ProductsContent />
      ) : (
        <ModalWindowContext.Provider value={signInModalContext}>
          <ModalWindow />
        </ModalWindowContext.Provider>
      )}
    </div>
  );
}

export default ProductsPage;

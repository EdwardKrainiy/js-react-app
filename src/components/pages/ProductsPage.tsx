import ModalWindow from "@/elements/ModalWindow";
import ProductsContent from "@/elements/ProductsContent";
import "src/components/pages/page.scss";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import setLocalStorageItem from "@/util/SetLocalStorageItem";

function ProductsPage() {
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
      <ProductsContent />
    </div>
  );
}

export default ProductsPage;

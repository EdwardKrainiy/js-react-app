import { createContext } from "react";

interface ModalWindowContextProps {
  isModalWindowOpened: boolean;
  onCloseModal: () => void;
  modalTitle: string;
  modalType: string;
  setUserLogin: (login: string) => void;
}

const ModalWindowContext = createContext<ModalWindowContextProps>({
  isModalWindowOpened: false,
  onCloseModal: () => undefined,
  modalTitle: "",
  modalType: "",
  setUserLogin: () => undefined,
});

export default ModalWindowContext;

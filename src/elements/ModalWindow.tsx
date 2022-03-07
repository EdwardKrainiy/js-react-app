import ReactDOM from "react-dom";
import "src/elements/modalWindow.scss";
import { useState, useEffect } from "react";
import ROUTES from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import closebutton from "../assets/images/close-button.png";
import REGEX_VALUES from "../util/RegexValue";
import post from "../util/PostRequest";

interface IProps {
  modalTitle: string;
  onCloseModal: () => void;
  isModalWindowOpened: boolean;
  modalType: string;
  setUserLogin: (login: string) => void;
}

function ModalForm({
  modalType,
  onCloseModal,
  setUserLogin,
}: {
  modalType: string;
  onCloseModal: () => void;
  setUserLogin: (login: string) => void;
}) {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");
  const [isLoginExists, setIsLoginExists] = useState(false);
  const [isUserExists, setIsUserExists] = useState(true);

  const [isLoginCorrect, setIsLoginCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isRepeatedPasswordCorrect, setIsRepeatedPasswordCorrect] = useState(false);

  const navigation = useNavigate();

  const onLoginChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsLoginCorrect(RegExp(REGEX_VALUES.LOGIN_REGEX).test(e.currentTarget.value));
    setLoginValue(e.currentTarget.value);
  };

  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsPasswordCorrect(RegExp(REGEX_VALUES.PASSWORD_REGEX).test(e.currentTarget.value));
    setIsRepeatedPasswordCorrect(
      RegExp(REGEX_VALUES.PASSWORD_REGEX).test(e.currentTarget.value) && repeatPasswordValue === e.currentTarget.value
    );
    setPasswordValue(e.currentTarget.value);
  };

  const onRepeatPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setIsRepeatedPasswordCorrect(e.currentTarget.value !== "" && passwordValue === e.currentTarget.value);
    setRepeatPasswordValue(e.currentTarget.value);
  };

  const handleSignUpSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const loginAndPasswordObj: { email: string; password: string } = {
        email: loginValue,
        password: passwordValue,
      };
      const body = await post<{ accessToken: string }>(ROUTES.SIGNUP_API, loginAndPasswordObj);
      localStorage.setItem("accessToken", body.accessToken);
      setUserLogin(loginValue);
      setIsLoginExists(false);
      onCloseModal();
      navigation("/profile");
    } catch (error) {
      setIsLoginExists(true);
      console.log(error);
    }
  };

  const handleSignInSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const loginAndPasswordObj: { email: string; password: string } = {
        email: loginValue,
        password: passwordValue,
      };
      const body = await post<{ accessToken: string }>(ROUTES.SIGNIN_API, loginAndPasswordObj);
      localStorage.setItem("accessToken", body.accessToken);
      setUserLogin(loginValue);
      setIsUserExists(false);
      onCloseModal();
    } catch (error: unknown) {
      setIsUserExists(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const submitSignInButton = document.getElementById("sign-in-but") as HTMLInputElement;
    if (submitSignInButton) {
      submitSignInButton.disabled = !(isLoginCorrect && isPasswordCorrect);
    }

    const submitSignUpButton = document.getElementById("sign-up-but") as HTMLInputElement;
    if (submitSignUpButton) {
      submitSignUpButton.disabled = !(isLoginCorrect && isRepeatedPasswordCorrect && isRepeatedPasswordCorrect);
    }
  }, [loginValue, passwordValue, repeatPasswordValue]);

  if (modalType === "sign-in") {
    return (
      <form id="modal-signin-window" onSubmit={handleSignInSubmit} action="">
        <div className="form-container">
          <label htmlFor="sign-in-login-field">
            <div className="label-text-container">Login</div>
            <input
              type="text"
              name="login"
              id="sign-in-login-field"
              className={isLoginCorrect ? "input-container" : "input-container incorrect-value"}
              onChange={onLoginChange}
            />
          </label>
        </div>
        <div className="form-container">
          <label htmlFor="sign-in-password-field">
            <div className="label-text-container">Password</div>
            <input
              type="password"
              name="password"
              id="sign-in-password-field"
              className={isPasswordCorrect ? "input-container" : "input-container incorrect-value"}
              onChange={onPasswordChange}
            />
          </label>
          {isUserExists ? null : <p className="error-message">User not found!</p>}
          <button form="modal-signin-window" id="sign-in-but" type="submit" className="submit-form-button" disabled>
            Sign in
          </button>
        </div>
      </form>
    );
  }
  if (modalType === "sign-up") {
    return (
      <form id="modal-signup-window" onSubmit={handleSignUpSubmit} action="">
        <div className="form-container">
          <label htmlFor="sign-up-login-field">
            <div className="label-text-container">Login</div>
            <input
              type="text"
              name="login"
              id="sign-up-login-field"
              className={isLoginCorrect ? "input-container" : "input-container incorrect-value"}
              onChange={onLoginChange}
            />
          </label>
          <label htmlFor="sign-up-password-field">
            <div className="label-text-container">Password</div>
            <input
              type="password"
              name="password"
              id="sign-up-password-field"
              className={isPasswordCorrect ? "input-container" : "input-container incorrect-value"}
              onChange={onPasswordChange}
            />
          </label>
          <label htmlFor="sign-up-repeat-password-field">
            <div className="label-text-container">Repeat password</div>
            <input
              type="password"
              name="repeat-password"
              id="sign-up-repeat-password-field"
              className={isRepeatedPasswordCorrect ? "input-container" : "input-container incorrect-value"}
              onChange={onRepeatPasswordChange}
            />
          </label>
          {isLoginExists ? <p className="error-message">User with those login already exists!</p> : null}
          <button form="modal-signup-window" type="submit" className="submit-form-button" id="sign-up-but" disabled>
            Sign up
          </button>
        </div>
      </form>
    );
  }
  return null;
}

function WindowContent({ modalTitle, onCloseModal, isModalWindowOpened, modalType, setUserLogin }: IProps) {
  if (isModalWindowOpened) {
    return (
      <div className="modal-window-container">
        <div className="modal">
          <div role="button" tabIndex={0} onMouseUp={onCloseModal} className="close-button-container">
            <img src={closebutton as string} alt="" className="close-button-container" />
          </div>
          <div>
            <p className="title-text">{modalTitle}</p>
            <ModalForm modalType={modalType} onCloseModal={onCloseModal} setUserLogin={setUserLogin} />
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function ModalWindow({ modalTitle, onCloseModal, isModalWindowOpened, modalType, setUserLogin }: IProps) {
  return ReactDOM.createPortal(
    <WindowContent
      modalTitle={modalTitle}
      isModalWindowOpened={isModalWindowOpened}
      onCloseModal={onCloseModal}
      modalType={modalType}
      setUserLogin={setUserLogin}
    />,
    document.getElementById("modal-window") as HTMLElement
  );
}

export default ModalWindow;

import { useEffect } from "react";
import { useLoginModal } from "../portal/context/LoginModalContext";
import "./LoginModal.css";
import Auths from "../portal/components/Auth";

export default function LoginModal() {
  const { isOpen, closeLogin } = useLoginModal();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("login-modal-open");
    } else {
      document.body.classList.remove("login-modal-open");
    }
    return () => document.body.classList.remove("login-modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="login-modal-backdrop" onClick={closeLogin}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          className="login-modal-close"
          onClick={closeLogin}
          aria-label="Close login"
        >
          ✕
        </button>
        <Auths />
      </div>
    </div>
  );
}
import { createContext, useContext, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  return (
    <LoginModalContext.Provider value={{ isOpen, openLogin, closeLogin }}>
      {children}
    </LoginModalContext.Provider>
  );
}

export const useLoginModal = () => useContext(LoginModalContext);
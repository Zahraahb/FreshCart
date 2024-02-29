import { createContext, useState } from "react";

export const userContext = createContext(null);

export function UserContextProvider({ children }) {
  let [user, setIsUser] = useState(null);
  let [isLogin, setLogin] = useState(null);
  let [userEmail, setUserEmail] = useState("");

  return (
    <userContext.Provider
      value={{ user, setIsUser, isLogin, setLogin, userEmail, setUserEmail }}
    >
      {children}
    </userContext.Provider>
  );
}

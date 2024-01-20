import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TokenContext = createContext();

const AuthProvider = ({ children }) => {
  const token = useState(localStorage.getItem("user"));
  const [tokenValue, _] = token;

  useEffect(() => {
    if (tokenValue) {
      axios.defaults.headers.common["Authorization"] = tokenValue;
      localStorage.setItem("user", tokenValue);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("user");
    }
  }, [token]);
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(TokenContext);
};
export { AuthProvider };

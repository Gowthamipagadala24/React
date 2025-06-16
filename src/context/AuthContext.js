import React, { createContext, useState,  useContext } from "react";
import { users as mockUsers } from "../data/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("bankUser"))
  );

  const login = (username, password) => {
    const found = mockUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      localStorage.setItem("bankUser", JSON.stringify(found));
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("bankUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

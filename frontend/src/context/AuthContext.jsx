import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const login = async (email, password) => {
    try {
      const respuesta = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", respuesta.data.token);

      setUsuario(respuesta.data.usuario);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    setUsuario(null);
  };
  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

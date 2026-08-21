import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

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

  useEffect(() => {
    const cargarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const respuesta = await api.get("/auth/me");
        setUsuario(respuesta.data.usuario);
      } catch (error) {
        localStorage.removeItem("token");
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

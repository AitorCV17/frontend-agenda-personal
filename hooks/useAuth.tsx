import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

// Interfaces
interface User {
  id: string;
  email: string;
  rol: string;
  nombre: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: (user: User) => void;
  loadUserFromToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserFromToken();
    setIsLoading(false);
  }, []);

  const loadUserFromToken = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("[AuthProvider] No token found");
      setUser(null);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      const loadedUser: User = {
        id: decoded.id,
        email: decoded.email,
        rol: decoded.rol,
        nombre: decoded.nombre || "",
      };

      setUser(loadedUser);
      console.log("[AuthProvider] Usuario cargado desde el token:", loadedUser);
    } catch (error) {
      console.error("[AuthProvider] Error al decodificar el token:", error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { accessToken } = res.data;

      localStorage.setItem("accessToken", accessToken);

      loadUserFromToken();
      console.log("[AuthProvider] Usuario logueado manualmente");
    } catch (error) {
      console.error("[AuthProvider] Error en login:", error);
      throw error;
    }
  };

  const register = async (nombre: string, email: string, password: string) => {
    try {
      await axiosInstance.post("/auth/register", { nombre, email, password });
      console.log("[AuthProvider] Registro exitoso");
    } catch (error) {
      console.error("[AuthProvider] Error en registro:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    console.log("[AuthProvider] Usuario deslogueado");
  };

  const refreshUser = (updatedUser: User) => {
    setUser(updatedUser);
    console.log("[AuthProvider] Usuario actualizado:", updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
        loadUserFromToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

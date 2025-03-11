import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import jwtDecode from "jwt-decode";
import axiosInstance from "../utils/axiosInstance"; // <-- Usamos nuestra instancia
// Tipado básico para el usuario (ajustar según el backend)
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          id: decoded.id,
          email: decoded.email,
          rol: decoded.rol,
          nombre: decoded.nombre || ""
        });
      } catch (error) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  /**
   * Login: envía email/password a /auth/login
   */
  const login = async (email: string, password: string) => {
    // Usamos la instancia con baseURL: "http://localhost:3020/api"
    const res = await axiosInstance.post("/auth/login", { email, password });
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);

    // Decodificamos el token y guardamos el usuario
    const decoded: any = jwtDecode(accessToken);
    setUser({
      id: decoded.id,
      email: decoded.email,
      rol: decoded.rol,
      nombre: decoded.nombre || ""
    });
  };

  /**
   * Register: envía nombre/email/password a /auth/register
   */
  const register = async (nombre: string, email: string, password: string) => {
    await axiosInstance.post("/auth/register", { nombre, email, password });
    // Opcional: tras registro, podrías loguear automáticamente o redirigir
  };

  /**
   * Cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  /**
   * Actualiza el user en caso de cambios (perfil, etc.)
   */
  const refreshUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};

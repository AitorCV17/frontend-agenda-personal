// hooks/useAuth.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "utils/axiosInstance";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const loadedUser: User = {
          id: decoded.id,
          email: decoded.email,
          rol: decoded.rol,
          nombre: decoded.nombre || "",
        };
        setUser(loadedUser);
      } catch (error) {
        console.error('[AuthProvider] Error decodificando token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    loadUserFromToken(); // Se reutiliza la función para cargar el usuario
  };

  const register = async (nombre: string, email: string, password: string) => {
    await axiosInstance.post("/auth/register", { nombre, email, password });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser, loadUserFromToken }}>
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

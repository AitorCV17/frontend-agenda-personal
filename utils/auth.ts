// Funciones auxiliares para manejo de JWT y almacenamiento
import { jwtDecode } from "jwt-decode";

export const getTokenPayload = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

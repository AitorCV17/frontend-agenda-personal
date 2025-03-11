import axios from "axios";

/**
 * Lee la variable de entorno NEXT_PUBLIC_API_URL (por ejemplo "http://localhost:3020/api").
 * Todas las peticiones usarán esta URL base, evitando el problema de agregar /api dos veces.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

// Interceptor para inyectar el token en cada request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

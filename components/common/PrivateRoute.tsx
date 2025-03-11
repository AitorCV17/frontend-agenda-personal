import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    } else if (requiredRole && user && user.rol !== requiredRole) {
      // Si se requiere un rol específico y no coincide, redirige o muestra mensaje
      router.push("/");
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading || !user) return <p>Cargando...</p>;

  return <>{children}</>;
};

export default PrivateRoute;

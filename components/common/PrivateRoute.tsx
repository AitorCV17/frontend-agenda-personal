// components/common/PrivateRoute.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { ReactNode } from "react";
import Loader from "./Loader";

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
      router.push("/");
    }
  }, [user, isLoading, router, requiredRole]);

  if (isLoading || !user) return <Loader />;

  return <>{children}</>;
};

export default PrivateRoute;

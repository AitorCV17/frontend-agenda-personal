// pages/index.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "hooks/useAuth";

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Si está autenticado, redirige al dashboard; de lo contrario, a login.
      router.push(user ? "/dashboard" : "/auth/login");
    }
  }, [user, isLoading, router]);

  return <div>Cargando...</div>;
}

import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";

const GoogleCallback = () => {
  const router = useRouter();
  const { loadUserFromToken } = useAuth();

  // Esta referencia asegura que solo procesamos una vez
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return; // Evita ejecuciones múltiples

    const { accessToken, refreshToken } = router.query;

    console.log("[GoogleCallback] Tokens recibidos:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      hasProcessed.current = true; // Evita futuros llamados al mismo efecto

      localStorage.setItem("accessToken", String(accessToken));
      localStorage.setItem("refreshToken", String(refreshToken));

      loadUserFromToken();

      router.push("/dashboard");
    } else if (!accessToken && !refreshToken && hasProcessed.current === false) {
      // Evita redirigir antes de que router.query esté listo
      console.log("[GoogleCallback] Esperando tokens...");
    } else {
      hasProcessed.current = true;
      router.push("/auth/login");
    }
  }, [router.query, loadUserFromToken, router]);

  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl">Procesando autenticación...</h2>
    </div>
  );
};

export default GoogleCallback;

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/common/Header";

export default function Home() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  useEffect(() => {
    if (router.query.accessToken && router.query.refreshToken) {
      const { accessToken, refreshToken } = router.query;
      // Guardar en localStorage
      localStorage.setItem("accessToken", String(accessToken));
      localStorage.setItem("refreshToken", String(refreshToken));

      // Si quieres decodificar y setear el user:
      // (Podrías hacerlo en tu AuthProvider, para simplificar)
      // O forzar un reload:
      window.location.href = "/dashboard"; // o la ruta que quieras
    }
  }, [router.query, refreshUser]);

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Bienvenido a Agenda Personal</h1>
        <p className="mt-4">Organiza tus eventos, administra recordatorios y más.</p>
      </main>
    </>
  );
}

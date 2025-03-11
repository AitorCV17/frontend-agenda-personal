import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/">
        <a className="text-xl font-bold">Agenda Personal</a>
      </Link>
      <nav>
        {user ? (
          <>
            <Link href="/dashboard">
              <a className="mx-2">Dashboard</a>
            </Link>
            <Link href="/events">
              <a className="mx-2">Eventos</a>
            </Link>
            <Link href="/profile">
              <a className="mx-2">Perfil</a>
            </Link>
            <button onClick={logout} className="mx-2 hover:underline">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <a className="mx-2">Iniciar Sesión</a>
            </Link>
            <Link href="/auth/register">
              <a className="mx-2">Registrarse</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

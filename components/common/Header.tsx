// components/common/Header.tsx
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "hooks/useAuth";
import { motion } from "framer-motion";
import { Bars3Icon as MenuIcon, XMarkIcon as XIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 bg-emerald-500/80 dark:bg-emerald-800/80 backdrop-blur-lg text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
          Agenda Personal
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/events" className="hover:underline">
                Eventos
              </Link>
              <Link href="/profile" className="hover:underline">
                Perfil
              </Link>
              <button onClick={logout} className="hover:underline">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hover:underline">
                Iniciar Sesión
              </Link>
              <Link href="/auth/register" className="hover:underline">
                Registrarse
              </Link>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Modo oscuro/claro"
            className="p-2 rounded-full hover:bg-emerald-600 transition-colors"
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-emerald-600/90 dark:bg-emerald-700/90 rounded-b-lg p-4"
        >
          <ul className="flex flex-col space-y-3">
            {user ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/events">Eventos</Link>
                </li>
                <li>
                  <Link href="/profile">Perfil</Link>
                </li>
                <li>
                  <button onClick={logout}>Cerrar Sesión</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link href="/auth/register">Registrarse</Link>
                </li>
              </>
            )}
            <li>
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? "Modo Claro" : "Modo Oscuro"}
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Header;

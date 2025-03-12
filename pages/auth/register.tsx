// pages/auth/register.tsx
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import RegisterForm from "components/forms/RegisterForm";
import { useAuth } from "hooks/useAuth";

const RegisterPage: NextPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Si el usuario ya está autenticado, redirigir al dashboard.
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="text-emerald-500 hover:underline"
          >
            Inicia sesión
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

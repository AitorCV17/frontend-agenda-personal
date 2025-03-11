// components/forms/LoginForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { motion } from "framer-motion";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      window.location.href = "/dashboard";
    } catch (error: any) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = () => {
    // Redirección al backend para autenticación con Google
    window.location.href = "http://localhost:3020/api/auth/google";
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 glass shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h1>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          {...register("password", { required: "La contraseña es obligatoria" })}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <button type="submit" className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
        Iniciar Sesión
      </button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-2 mt-4 border border-emerald-500 text-emerald-500 rounded hover:bg-emerald-500 hover:text-white transition-colors"
      >
        Iniciar con Google
      </button>
    </motion.form>
  );
};

export default LoginForm;

// components/forms/RegisterForm.tsx
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { motion } from "framer-motion";

interface RegisterFormInputs {
  nombre: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [message, setMessage] = useState("");

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data.nombre, data.email, data.password);
      setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (error: any) {
      setMessage(error.message || "Error en el registro");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 glass shadow-lg rounded-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
      <div className="mb-4">
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          {...register("nombre", { required: "El nombre es obligatorio", minLength: 3, maxLength: 50 })}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
        {errors.nombre && <span className="text-red-500">{errors.nombre.message}</span>}
      </div>
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
          {...register("password", { required: "La contraseña es obligatoria", minLength: 6 })}
          className="w-full p-2 border rounded focus:ring-emerald-500"
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <button type="submit" className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
        Registrarse
      </button>
    </motion.form>
  );
};

export default RegisterForm;

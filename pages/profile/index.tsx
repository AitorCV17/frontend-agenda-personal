// pages/profile/index.tsx
import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { useAuth } from "hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";

interface ProfileFormInputs {
  nombre: string;
  email: string;
}

const ProfilePage: NextPage = () => {
  const { user, refreshUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormInputs>({
    defaultValues: { nombre: user?.nombre, email: user?.email }
  });
  const [message, setMessage] = useState("");

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const res = await axios.put("/api/users/me", data);
      refreshUser(res.data);
      setMessage("Perfil actualizado correctamente.");
    } catch (error) {
      setMessage("Error actualizando el perfil.");
    }
  };

  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Mi Perfil
        </motion.h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 glass shadow-lg rounded-lg">
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              {...register("nombre", { required: true, minLength: 3, maxLength: 50 })}
              className="w-full border p-2 rounded focus:ring-emerald-500"
            />
            {errors.nombre && <span className="text-red-500">Nombre inválido</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full border p-2 rounded focus:ring-emerald-500"
            />
            {errors.email && <span className="text-red-500">Email inválido</span>}
          </div>
          <button type="submit" className="bg-emerald-500 text-white py-2 px-4 rounded hover:bg-emerald-600 transition-colors">
            Actualizar Perfil
          </button>
          {message && <p className="mt-2 text-center">{message}</p>}
        </form>
      </main>
      <Footer />
    </PrivateRoute>
  );
};

export default ProfilePage;

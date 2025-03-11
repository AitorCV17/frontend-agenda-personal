import { NextPage } from "next";
import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

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
        <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md">
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              type="text"
              {...register("nombre", { required: true, minLength: 3, maxLength: 50 })}
              className="w-full border p-2"
            />
            {errors.nombre && <span className="text-red-500">Nombre inválido</span>}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full border p-2"
            />
            {errors.email && <span className="text-red-500">Email inválido</span>}
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Actualizar Perfil
          </button>
          {message && <p className="mt-2">{message}</p>}
        </form>
      </main>
    </PrivateRoute>
  );
};

export default ProfilePage;

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PrivateRoute from "components/common/PrivateRoute";
import Loader from "components/common/Loader";
import Header from "components/common/Header"; // ✅ IMPORTADO BIEN
import { useProfile, useUpdateProfile, useDeleteProfile } from "hooks/useProfile";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import Head from "next/head";

interface ProfileFormInputs {
  nombre: string;
  email: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const { data: profile, isLoading, isError } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const deleteProfileMutation = useDeleteProfile();
  const { refreshUser, logout } = useAuth();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormInputs>();

  useEffect(() => {
    if (profile) {
      reset({
        nombre: profile.nombre,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const res = await updateProfileMutation.mutateAsync(data);
      refreshUser({
        nombre: res.data.nombre,
        email: res.data.email,
      });
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil", error);
      alert("Error al actualizar perfil");
    }
  };

  const onDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible.")) return;
    try {
      await deleteProfileMutation.mutateAsync();
      logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al eliminar cuenta", error);
      alert("Error al eliminar la cuenta");
    }
  };

  return (
    <>
      <Head>
        <title>Mi Perfil - Agenda Personal</title>
      </Head>

      {/* ✅ Header debe ir fuera de PrivateRoute para que cargue siempre */}
      <Header />

      <PrivateRoute>
        <main className="min-h-screen bg-gray-900 text-white">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p className="text-center text-red-500 mt-10">Error al cargar el perfil.</p>
          ) : (
            <div className="max-w-lg mx-auto p-6 glass rounded-lg shadow-lg mt-10">
              <h1 className="text-2xl font-bold text-center mb-6">Mi Perfil</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold">Nombre</label>
                  <input
                    type="text"
                    {...register("nombre", { required: "El nombre es obligatorio" })}
                    className="w-full p-2 border rounded text-black"
                  />
                  {errors.nombre?.message && (
                    <p className="text-red-500">{errors.nombre.message as string}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Correo Electrónico</label>
                  <input
                    type="email"
                    {...register("email", { required: "El email es obligatorio" })}
                    className="w-full p-2 border rounded text-black"
                  />
                  {errors.email?.message && (
                    <p className="text-red-500">{errors.email.message as string}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={updateProfileMutation.isLoading}
                  className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                >
                  {updateProfileMutation.isLoading ? "Actualizando..." : "Actualizar Perfil"}
                </button>

                <button
                  type="button"
                  onClick={onDelete}
                  disabled={deleteProfileMutation.isLoading}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
                >
                  {deleteProfileMutation.isLoading ? "Eliminando cuenta..." : "Eliminar Cuenta"}
                </button>
              </form>
            </div>
          )}
        </main>
      </PrivateRoute>
    </>
  );
};

export default ProfilePage;

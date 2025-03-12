import { useQuery, useMutation, useQueryClient } from "react-query";
import axiosInstance from "utils/axiosInstance";

// GET: Perfil del usuario autenticado
export const useProfile = () => {
  return useQuery("profile", async () => {
    const { data } = await axiosInstance.get("/users/profile");
    return data;
  });
};

// PUT: Actualizar perfil
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (profileData: { nombre: string; email: string }) =>
      axiosInstance.put("/users/profile", profileData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("profile");
      },
    }
  );
};

// DELETE: Eliminar perfil
export const useDeleteProfile = () => {
  return useMutation(() => axiosInstance.delete("/users/profile"));
};

// hooks/useEvents.tsx
import { useQuery } from "react-query";
import axiosInstance from "utils/axiosInstance";

// Se utiliza React Query para obtener los eventos de forma eficiente.
export const useEvents = () => {
  return useQuery("events", async () => {
    const { data } = await axiosInstance.get("/events");
    return data;
  });
};

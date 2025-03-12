// pages/events/index.tsx

import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import { motion } from "framer-motion";
import { useEvents } from "hooks/useEvents";
import axiosInstance from "utils/axiosInstance";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";

const EventsPage: NextPage = () => {
  const queryClient = useQueryClient();
  const { data: events, isLoading, error } = useEvents();

  // Mutación para eliminar un evento
  const deleteEventMutation = useMutation(
    (id: string) => axiosInstance.delete(`/events/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este evento?")) {
      await deleteEventMutation.mutateAsync(id);
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
          Mis Eventos
        </motion.h2>

        {/* BOTÓN PARA CREAR NUEVO EVENTO */}
        <div className="mb-4">
          <Link href="/events/new">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
              Crear Evento
            </button>
          </Link>
        </div>

        {isLoading && <p>Cargando eventos...</p>}
        {error && <p>Error al cargar los eventos.</p>}
        {events && events.length === 0 && <p>No hay eventos registrados.</p>}
        {events && events.length > 0 && (
          <ul className="space-y-4">
            {events.map((event: any) => (
              <motion.li
                key={event.id}
                className="p-4 border rounded glass flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div>
                  <h3 className="font-bold">{event.titulo}</h3>
                  <p>{event.descripcion}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => (window.location.href = `/events/${event.id}`)}
                    className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </main>
    </PrivateRoute>
  );
};

export default EventsPage;

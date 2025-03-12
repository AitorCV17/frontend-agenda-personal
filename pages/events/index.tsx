import { NextPage } from "next";
import Link from "next/link";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import { motion } from "framer-motion";
import { useEvents } from "hooks/useEvents";
import axiosInstance from "utils/axiosInstance";
import { useMutation, useQueryClient } from "react-query";

const EventsPage: NextPage = () => {
  const queryClient = useQueryClient();
  const { data: events, isLoading, error } = useEvents();

  const deleteEventMutation = useMutation(
    (id: string) => axiosInstance.delete(`/events/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries("events"),
    }
  );

  const handleDelete = async (id: string) => {
    if (confirm("¿Seguro que quieres eliminar el evento?")) {
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
        >
          Mis Eventos
        </motion.h2>

        {/* Botón para crear evento */}
        <div className="mb-4">
          <Link href="/events/new">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600">
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
              >
                <div>
                  <h3 className="font-bold">{event.titulo}</h3>
                  <p>{event.descripcion}</p>
                </div>
                <div className="flex space-x-2">
                  <Link href={`/events/${event.id}`}>
                    <button className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600">
                      Editar
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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

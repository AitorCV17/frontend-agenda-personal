// pages/events/index.tsx
import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { useEvents } from "hooks/useEvents";
import { motion } from "framer-motion";

const EventsPage: NextPage = () => {
  const { data: events, isLoading, error } = useEvents();

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
        {isLoading && <p>Cargando eventos...</p>}
        {error && <p>Error al cargar los eventos.</p>}
        {events && events.length === 0 && <p>No hay eventos registrados.</p>}
        {events && events.length > 0 && (
          <ul className="space-y-4">
            {events.map((event: any) => (
              <motion.li
                key={event.id}
                className="p-4 border rounded glass"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-bold">{event.titulo}</h3>
                <p>{event.descripcion}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </PrivateRoute>
  );
};

export default EventsPage;

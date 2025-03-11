// pages/dashboard/index.tsx
import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { useEvents } from "hooks/useEvents";
import { motion } from "framer-motion";

const Dashboard: NextPage = () => {
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
          Dashboard de Usuario
        </motion.h2>
        {isLoading && <p>Cargando eventos...</p>}
        {error && <p>Error al cargar los eventos.</p>}
        {events && events.length === 0 && <p>No hay eventos registrados.</p>}
        {events && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event: any) => (
              <motion.div
                key={event.id}
                className="p-4 glass rounded shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-bold">{event.titulo}</h3>
                <p>{event.descripcion}</p>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </PrivateRoute>
  );
};

export default Dashboard;

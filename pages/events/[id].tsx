// pages/events/[id].tsx
import { NextPage } from "next";
import { useRouter } from "next/router";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import EventForm from "components/forms/EventForm";
import { useEvents } from "hooks/useEvents";
import { motion } from "framer-motion";

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: events } = useEvents();

  // Se busca el evento por id para edición, de lo contrario se mostrará formulario de creación.
  const event = events?.find((ev: any) => ev.id === id);

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
          {event ? "Editar Evento" : "Crear Evento"}
        </motion.h2>
        <EventForm event={event} />
      </main>
      <Footer />
    </PrivateRoute>
  );
};

export default EventDetailPage;

import { NextPage } from "next";
import { useRouter } from "next/router";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import EventForm from "components/forms/EventForm";
import { useEvents } from "hooks/useEvents";
import { motion } from "framer-motion";

const EditEventPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: events } = useEvents();

  const event = events?.find((ev: any) => ev.id === id);

  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {event ? "Editar Evento" : "Evento no encontrado"}
        </motion.h2>
        {event && <EventForm event={event} />}
      </main>
    </PrivateRoute>
  );
};

export default EditEventPage;

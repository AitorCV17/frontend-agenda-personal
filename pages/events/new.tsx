import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
import EventForm from "components/forms/EventForm";
import { motion } from "framer-motion";

const NewEventPage: NextPage = () => {
  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Crear Evento
        </motion.h2>
        <EventForm />
      </main>
    </PrivateRoute>
  );
};

export default NewEventPage;

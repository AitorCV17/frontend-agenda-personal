import { NextPage } from "next";
import { useRouter } from "next/router";
import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";
import EventForm from "../../components/forms/EventForm";
import { useEvents } from "../../hooks/useEvents";

const EventDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: events } = useEvents();

  // Buscamos el evento por id (para edición)
  const event = events?.find((ev: any) => ev.id === id);

  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          {event ? "Editar Evento" : "Crear Evento"}
        </h2>
        <EventForm event={event} />
      </main>
    </PrivateRoute>
  );
};

export default EventDetailPage;

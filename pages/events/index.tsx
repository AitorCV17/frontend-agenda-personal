import { NextPage } from "next";
import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";
import { useEvents } from "../../hooks/useEvents";

const EventsPage: NextPage = () => {
  const { data: events, isLoading, error } = useEvents();

  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Mis Eventos</h2>
        {isLoading && <p>Cargando eventos...</p>}
        {error && <p>Error al cargar los eventos.</p>}
        {events && events.length === 0 && <p>No hay eventos registrados.</p>}
        {events && events.length > 0 && (
          <ul>
            {events.map((event: any) => (
              <li key={event.id} className="border p-2 my-2">
                <h3 className="font-bold">{event.titulo}</h3>
                <p>{event.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </PrivateRoute>
  );
};

export default EventsPage;

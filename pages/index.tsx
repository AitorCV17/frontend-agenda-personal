import { NextPage } from "next";
import PrivateRoute from "../components/common/PrivateRoute";
import Header from "../components/common/Header";
import { useAuth } from "../hooks/useAuth";

const Dashboard: NextPage = () => {
  const { user } = useAuth();

  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Dashboard de Usuario</h2>

        {user && (
          <p className="mt-4">
            ¡Bienvenido, <strong>{user.nombre || user.email}</strong>!
          </p>
        )}
      </main>
    </PrivateRoute>
  );
};

export default Dashboard;

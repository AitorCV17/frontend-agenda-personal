import { NextPage } from "next";
import PrivateRoute from "../../components/common/PrivateRoute";
import Header from "../../components/common/Header";

const Dashboard: NextPage = () => {
  return (
    <PrivateRoute>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold">Dashboard de Usuario</h2>
        {/* Aquí puedes agregar componentes y vistas según el rol y funciones */}
      </main>
    </PrivateRoute>
  );
};

export default Dashboard;

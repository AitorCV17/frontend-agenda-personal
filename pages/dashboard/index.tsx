// pages/dashboard/index.tsx
import { NextPage } from "next";
import PrivateRoute from "components/common/PrivateRoute";
import Header from "components/common/Header";
// Se elimina la importación del Footer
// import Footer from "components/common/Footer";
import { motion } from "framer-motion";

const Dashboard: NextPage = () => {
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
          Dashboard
        </motion.h2>
        {/* Contenido del Dashboard */}
      </main>
      {/* Footer eliminado */}
    </PrivateRoute>
  );
};

export default Dashboard;

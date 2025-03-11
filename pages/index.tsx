// pages/index.tsx
import { NextPage } from "next";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <motion.section
          className="text-center py-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-aos="fade-up"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido a Agenda Personal</h1>
          <p className="text-lg md:text-2xl mb-8">Organiza tu vida de manera profesional y creativa</p>
          <a href="/auth/register" className="px-6 py-3 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors">
            Comienza Ahora
          </a>
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default Home;

// pages/auth/register.tsx
import { NextPage } from "next";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import RegisterForm from "components/forms/RegisterForm";
import { motion } from "framer-motion";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Header />
      <motion.main
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <RegisterForm />
      </motion.main>
      <Footer />
    </>
  );
};

export default RegisterPage;

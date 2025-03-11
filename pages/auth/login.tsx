// pages/auth/login.tsx
import { NextPage } from "next";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import LoginForm from "components/forms/LoginForm";
import { motion } from "framer-motion";

const LoginPage: NextPage = () => {
  return (
    <>
      <Header />
      <motion.main
        className="container mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <LoginForm />
      </motion.main>
      <Footer />
    </>
  );
};

export default LoginPage;

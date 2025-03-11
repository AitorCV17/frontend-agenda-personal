import { NextPage } from "next";
import LoginForm from "../../components/forms/LoginForm";
import Header from "../../components/common/Header";

const LoginPage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <LoginForm />
      </main>
    </>
  );
};

export default LoginPage;

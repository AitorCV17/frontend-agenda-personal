import { NextPage } from "next";
import RegisterForm from "../../components/forms/RegisterForm";
import Header from "../../components/common/Header";

const RegisterPage: NextPage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Registro</h2>
        <RegisterForm />
      </main>
    </>
  );
};

export default RegisterPage;

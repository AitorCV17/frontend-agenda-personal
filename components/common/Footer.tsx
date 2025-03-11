import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 mt-12 fade-in">
      <div className="flex justify-center space-x-6 mb-4 text-gray-600 dark:text-gray-300">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-transform hover:scale-110">
          <FaFacebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-transform hover:scale-110">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-transform hover:scale-110">
          <FaInstagram size={24} />
        </a>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Agenda Personal. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;

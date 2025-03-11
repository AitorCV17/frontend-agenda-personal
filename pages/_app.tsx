// pages/_app.tsx
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "hooks/useAuth";
import "styles/globals.css";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
        {/* Se eliminó el Loader global para evitar que tape el contenido */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;

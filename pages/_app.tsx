// pages/_app.tsx
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "hooks/useAuth";
import "styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;

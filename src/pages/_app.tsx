import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/Context/Auth";
import { ThemeModeProvider } from "@/Context/ThemeMode";
export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeModeProvider>
          <Component {...pageProps} />
        </ThemeModeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextContainer from "@/Context/AuthContextContainer";

let theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextContainer>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthContextContainer>
  );
}

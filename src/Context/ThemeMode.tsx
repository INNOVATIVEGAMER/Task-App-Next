import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type ThemeModeContextType = { toggleColorMode: () => void };
const ThemeModeContext = createContext<ThemeModeContextType>({
  toggleColorMode: () => {},
});

type ThemeMode = "light" | "dark";

const ThemeModeProvider = ({ children }: IProps) => {
  const [mode, setmode] = useState<ThemeMode>("light");
  const themeMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setmode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

const useThemeMode = () => useContext(ThemeModeContext);

export { ThemeModeProvider, useThemeMode };

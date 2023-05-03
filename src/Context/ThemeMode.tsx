import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type ThemeModeContextType = { toggleColorMode: () => void };
const ThemeModeContext = createContext<ThemeModeContextType>({
  toggleColorMode: () => {},
});

type ThemeMode = "light" | "dark";
const DEFAULT_THEME: ThemeMode = "light";

const ThemeModeProvider = ({ children }: IProps) => {
  const [mode, setmode] = useState<ThemeMode | null>(null);
  const themeMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setmode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    // Get the theme mode from localStorage
    const userTheme = localStorage.getItem("theme") as ThemeMode;

    // If the current theme mode is falsy and a theme mode is stored in localStorage,
    // set the stored theme mode as the current theme mode
    if (!mode && userTheme) {
      setmode(userTheme);
      return;
    }

    // If a theme mode is set, store it in localStorage
    if (mode) localStorage.setItem("theme", mode);
    // If no theme mode is set, set the default theme
    else setmode(DEFAULT_THEME);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ?? DEFAULT_THEME,
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

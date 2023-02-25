import { AUTH_PATHS } from "@/Constants/AuthConstants";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type AuthContextType = {
  authToken: string | null;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType>({
  authToken: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: IProps) => {
  const [authToken, setAuthToken] = useState<null | string>(null);
  const router = useRouter();

  // Check for an auth token in local or session storage on mount and when the auth token changes
  useEffect(() => {
    const LS_AUTH_TOKEN = localStorage.getItem("authToken");
    const SS_AUTH_TOKEN = sessionStorage.getItem("authToken");

    // If an auth token exists in local or session storage, set it as the auth token state
    if (LS_AUTH_TOKEN || SS_AUTH_TOKEN) {
      setAuthToken(LS_AUTH_TOKEN || SS_AUTH_TOKEN);
    }
    // If there is no auth token and the current path requires authentication, redirect to the signin page
    else if (!authToken && !AUTH_PATHS.includes(router.pathname)) {
      router.push("/signin");
    }
  }, [authToken, router.pathname]);

  // Login function that sets the auth token and remembers the user if desired
  const login = (token: string, remember: boolean) => {
    setAuthToken(token);

    if (remember) {
      localStorage.setItem("authToken", token);
      sessionStorage.removeItem("authToken");
    } else {
      sessionStorage.setItem("authToken", token);
      localStorage.removeItem("authToken");
    }
  };

  // Logout function that clears the auth token and storage
  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

import { AUTH_PATHS } from "@/Constants/AuthConstants";
import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type AuthContextType = {
  authToken: string | null;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
};
export const AuthContext = createContext<AuthContextType>({
  authToken: null,
  rememberMe: false,
  setRememberMe: () => {},
  setAuthToken: () => {},
});

const AuthContextContainer = ({ children }: IProps) => {
  const [authToken, setAuthToken] = useState<null | string>(null);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Get the auth token from local storage and session storage
    const LS_AUTH_TOKEN = localStorage.getItem("authToken");
    const SS_AUTH_TOKEN = sessionStorage.getItem("authToken");

    // If there is an auth token in storage and it hasn't been set in state yet, set it in state
    if (!authToken && (LS_AUTH_TOKEN || SS_AUTH_TOKEN)) {
      setAuthToken(LS_AUTH_TOKEN || SS_AUTH_TOKEN);
    }
    // If there is an auth token in state, store it in local or session storage based on the rememberMe value
    else if (authToken) {
      if (rememberMe) {
        localStorage.setItem("authToken", authToken);
        sessionStorage.removeItem("authToken");
      } else {
        sessionStorage.setItem("authToken", authToken);
        localStorage.removeItem("authToken");
      }
    }
    // If there is no auth token in storage, state, or pathname is not in the authorized paths, redirect to the sign-in page
    else if (!AUTH_PATHS.includes(router.pathname)) {
      router.push("/signin");
    }
  }, [authToken, rememberMe, router.pathname]);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, rememberMe, setRememberMe }}
    >
      <main>{children}</main>
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;

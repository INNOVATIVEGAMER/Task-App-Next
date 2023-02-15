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
    const LS_AUTH_TOKEN = localStorage.getItem("authToken");
    const SS_AUTH_TOKEN = sessionStorage.getItem("authToken");
    if (LS_AUTH_TOKEN && !authToken) setAuthToken(LS_AUTH_TOKEN);
    if (SS_AUTH_TOKEN && !authToken) setAuthToken(SS_AUTH_TOKEN);

    if (rememberMe && !LS_AUTH_TOKEN && authToken) {
      localStorage.setItem("authToken", authToken);
      sessionStorage.removeItem("authToken");
    }

    if (!rememberMe && !LS_AUTH_TOKEN && !SS_AUTH_TOKEN && authToken) {
      sessionStorage.setItem("authToken", authToken);
      localStorage.removeItem("authToken");
    }

    if (
      !SS_AUTH_TOKEN &&
      !LS_AUTH_TOKEN &&
      !authToken &&
      !AUTH_PATHS.includes(router.pathname)
    )
      router.push("/signin");
    console.log("here", authToken, rememberMe);
  }, [authToken, rememberMe]);

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken, rememberMe, setRememberMe }}
    >
      <main>{children}</main>
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;

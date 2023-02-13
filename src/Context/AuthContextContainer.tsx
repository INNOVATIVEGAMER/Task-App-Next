import React, { createContext, useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

type AuthContextType = {
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
};
export const AuthContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
});

const AuthContextContainer = ({ children }: IProps) => {
  const [authToken, setAuthToken] = useState<null | string>(null);

  useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem("authToken");
    if (AUTH_TOKEN) setAuthToken(AUTH_TOKEN);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <main>{children}</main>
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;

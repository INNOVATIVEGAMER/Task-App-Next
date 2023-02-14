import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/Context/AuthContextContainer";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return <main>{children}</main>;
};

export default AuthLayout;

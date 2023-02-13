import { Container } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return (
    <Container component="main" maxWidth="xs">
      <main>{children}</main>
    </Container>
  );
};

export default AuthLayout;

import { Container } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const ProfilePageLayout = ({ children }: IProps) => {
  return (
    <Container component="main" maxWidth="xl">
      <main>{children}</main>
    </Container>
  );
};

export default ProfilePageLayout;

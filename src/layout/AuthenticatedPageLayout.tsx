import Sidebar from "@/components/navigation/Sidebar";
import { Box } from "@mui/material";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const AuthenticatedPageLayout = ({ children }: IProps) => {
  return (
    <Box p={2}>
      <Sidebar>
        <main>{children}</main>
      </Sidebar>
    </Box>
  );
};

export default AuthenticatedPageLayout;

import LogoutAllButton from "@/components/auth/LogOutAllButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuth } from "@/Context/Auth";
import { Button } from "@mui/material";
import React, { useContext } from "react";

interface Props {}

const Dashboard = (props: Props) => {
  const { authToken } = useAuth();

  return (
    <>
      <div>Dashboard</div>
      <div>{authToken}</div>
      <LogoutButton />
      <LogoutAllButton />
    </>
  );
};

export default Dashboard;

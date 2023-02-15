import { useAuth } from "@/Context/Auth";
import React, { useContext } from "react";

interface Props {}

const Dashboard = (props: Props) => {
  const { authToken } = useAuth();

  return (
    <>
      <div>Dashboard</div>
      <div>{authToken}</div>
    </>
  );
};

export default Dashboard;

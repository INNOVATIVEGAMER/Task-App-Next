import { AuthContext } from "@/Context/AuthContextContainer";
import AuthLayout from "@/layout/AuthLayout";
import React, { useContext } from "react";

interface Props {}

const Dashboard = (props: Props) => {
  const authContext = useContext(AuthContext);

  return (
    <AuthLayout>
      <div>Dashboard</div>
      <div>{authContext.authToken}</div>
    </AuthLayout>
  );
};

export default Dashboard;

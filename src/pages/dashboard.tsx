import AuthContextContainer, {
  AuthContext,
} from "@/Context/AuthContextContainer";
import React, { useContext } from "react";

interface Props {}

const Dashboard = (props: Props) => {
  const authContext = useContext(AuthContext);
  return (
    <>
      <div>Dashboard</div>
      <div>{authContext.authToken}</div>
    </>
  );
};

export default Dashboard;

import LogoutAllButton from "@/components/auth/LogOutAllButton";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";
import React, { useContext } from "react";

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <>
      <div>Dashboard</div>
      <Link href="/profile">Profile</Link>
      <LogoutButton />
      <LogoutAllButton />
    </>
  );
};

export default Dashboard;

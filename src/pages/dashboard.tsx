import Link from "next/link";
import React from "react";

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <>
      <div>Dashboard</div>
      <Link href="/profile">Profile</Link>
    </>
  );
};

export default Dashboard;

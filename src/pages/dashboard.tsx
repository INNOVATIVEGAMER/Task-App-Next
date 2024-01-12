import AuthenticatedPageLayout from "@/layout/AuthenticatedPageLayout";
import Link from "next/link";
import React from "react";

interface Props {}

const Dashboard = (props: Props) => {
  return (
    <AuthenticatedPageLayout>
      <div>Dashboard</div>
    </AuthenticatedPageLayout>
  );
};

export default Dashboard;

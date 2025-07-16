"use client";

import { Button } from "../../../components/ui/button";
import { useTransition } from "react";
import { SignOut } from "../../../lib/handlers/user-actions";

const Dashboard = () => {
  const [isLogoutPending, startLogoutTransition] = useTransition();

  const handleLogOut = () => {
    startLogoutTransition(async () => {
      await SignOut();
    });
  };
  return (
    <>
      <p>Dashboard</p>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
};

export default Dashboard;

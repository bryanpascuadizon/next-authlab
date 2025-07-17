"use client";

import { Button } from "../../../components/ui/button";
import { useTransition } from "react";
import { SignOut } from "../../../lib/handlers/user-actions";

const Profile = () => {
  const [isLogoutPending, startLogoutTransition] = useTransition();

  const handleLogOut = () => {
    startLogoutTransition(async () => {
      await SignOut();
    });
  };
  return (
    <>
      <p>Profile</p>
      <Button className="cursor-pointer" onClick={handleLogOut}>
        {isLogoutPending ? "Logging out..." : "Logout"}
      </Button>
    </>
  );
};

export default Profile;

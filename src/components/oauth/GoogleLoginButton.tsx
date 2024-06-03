// import { signIn } from "@/auth";
import React from "react";
import { Button } from "../ui/button";
import { signIn } from "@/app/auth";

const GoogleLoginButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        Login with Google
      </Button>
    </form>
  );
};

export default GoogleLoginButton;

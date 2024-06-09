import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Clientform from "./Clientform";
const LoginForm = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription className="text-bold">
            Sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Clientform/>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;

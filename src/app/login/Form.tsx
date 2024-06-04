
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
// import { signIn } from "../auth";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "../auth";
import { signInWithCreds } from "@/actions/user.actions";
import Clientform from "./Clientform";



const LoginForm = () => {
  

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
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

import React from "react";
import { auth } from "../../auth";
import LoginForm from "./Form";

const Page = async () => {
  const session = await auth();
  return (
    <section className="flex items-center justify-center min-h-screen w-full bg-gray-800">
      <div>
        <LoginForm />
      </div>
    </section>
  );
};

export default Page;


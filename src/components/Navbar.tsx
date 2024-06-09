import Link from "next/link";
import React from "react";
import { auth } from "@/app/auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="top-0 flex h-16 bg-gray-800 items-center gap-4 border-b bg-background px-4 md:px-6 rounded-lg ml-2 mr-2">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="/" 
           className="text-white transition-colors hover:text-black hover:bg-blue-300 rounded-lg px-3 py-2 m-1">
            Home
           
        </Link>
        <Link href="/dashboard" 
           className="text-white transition-colors hover:text-black hover:bg-blue-300 rounded-lg px-3 py-2 m-1">
            Dashboard
           
        </Link>
        <Link href="/signal_config"
           className="text-white transition-colors hover:text-black hover:bg-blue-300 rounded-lg px-3 py-2 m-1">
            Signal-Config
           
        </Link>
        {session?.user && <SignOutButton />}
      </nav>
    </header>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";
// import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { auth } from "@/app/auth";
import SignOutButton from "./SignOutButton";

// import { auth } from "@/auth";

// import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
       
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Fault detection
        </Link>
        <Link
          href="/dashboard"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        
        <Link
          href="/signal_config"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Signal-Config
        </Link>
        {session?.user&&<SignOutButton/>}
      </nav>
    </header>
  );
};

export default Navbar;

import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;
  console.log(user);
  

  let userRole = "";
  if (user) {
    if (user.userType === "normal") {
      userRole = "Normal";
    } else if (user.userType === "poweruser") {
      userRole = "Power";
    } else if (user.userType === "admin") {
      userRole = "Admin";
    }
  }

  return (
    <header className="sticky top-0 flex h-16 bg-[#AF8F6F]   items-center justify-between border-b   px-4 md:px-6 rounded-md ">
       <div className=" flex items-center">
        <Link href="/" className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Steel_Authority_of_India_logo.svg/220px-Steel_Authority_of_India_logo.svg.png" alt="Logo" className="h-8 w-auto mr-4" />
        </Link>
        {userRole && (
          <span className="text-white text-sm mr-2">{userRole}</span>
        )}
      </div>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {(userRole!=="Admin")&&<Link href="/dashboard" 
           className="text-white transition-colors hover:text-[#543310] hover:bg-[#F8F4E1] rounded-lg px-3 py-2 m-1">
            Dashboard
        </Link>}
        {userRole==="Power"&&<Link href="/signal_config"
           className="text-white transition-colors hover:text-[#543310] hover:bg-[#F8F4E1] rounded-lg px-3 py-2 m-1">
            Signal-Config
        </Link>}
        {session?.user && <SignOutButton />}
      </nav>
    </header>
  );
};

export default Navbar;

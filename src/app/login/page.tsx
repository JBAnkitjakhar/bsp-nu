import React from "react";
import { auth } from "../../auth";
 
import Clientform from "./Clientform";

const Page = async () => {
  const session = await auth();
  return (
    <section   style={{ background: "rgb(89, 110, 145)" }}>
       
       <Clientform/>
    </section>
  );
};

export default Page;


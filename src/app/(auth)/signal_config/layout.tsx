import Navbar from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col-2 gap-4 p-4 flex-grow  " style={{ height: 'calc(100vh - 4rem)'}}>
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <Navbar /> */}

        <Sidebar />
      
        {children}
    </section>
  );
}

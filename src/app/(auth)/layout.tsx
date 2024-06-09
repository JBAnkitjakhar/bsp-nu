import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen " style={{background:'rgb(212, 207, 193)'}}>
     <Navbar/>
      <div className="p-4">
        {children}
      </div>
    </section>
  );
}

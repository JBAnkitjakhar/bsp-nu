import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="flex flex-col h-screen   px-1 py-1   "
      style={{ background: "rgb(89, 110, 145)" }}
    >
      <Navbar />
      {children}
    </section>
  );
}

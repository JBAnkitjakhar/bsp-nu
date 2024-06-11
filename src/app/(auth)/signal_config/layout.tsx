import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row" style={{ height: 'calc(100vh - 12rem)'}} >
      <Sidebar />
        <main className="flex-grow p-2 mx-2 overflow-auto border-amber-700">
        {children}
      </main>
      </div>
  );
}

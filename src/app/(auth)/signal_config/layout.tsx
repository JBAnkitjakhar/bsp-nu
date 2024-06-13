import React from 'react';
import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row  h-full pt-1 gap-1 overflow-auto ">
      <Sidebar />
        {children}
      
    </div>
  );
}

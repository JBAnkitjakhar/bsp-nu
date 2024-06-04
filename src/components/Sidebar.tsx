"use client"
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  
  return (
    <div className="bg-gray-50 dark:bg-gray-950 h-full w-[30vw] min-w-[280px] border border-sky-500 rounded dark:border-gray-800 p-6 flex flex-col gap-6 sticky left-0 top-0 bottom-0">
    
    <Link href="/signal_config/add_signal" className={`flex items-center justify-center gap-2 ${pathname.startsWith("signal_config/add_signal/")?"bg-black":"bg-white"}`}>
      {/* <PlusIcon className="h-4 w-4" /> */}
      Add Signal
    
    </Link>
    
    <Button variant="outline" className="flex items-center justify-center gap-2">
      {/* <TrashIcon className="h-4 w-4" /> */}
      Delete Signal
    </Button>
    <Button variant="outline" className="flex items-center justify-center gap-2">
      {/* <DeleteIcon className="h-4 w-4" /> */}
      Modify Weight
    </Button>
    <Button variant="outline" className="flex items-center justify-center gap-2">
      {/* <DownloadIcon className="h-4 w-4" /> */}
      Download Config
    </Button>
  </div>
  )
}

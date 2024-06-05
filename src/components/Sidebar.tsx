"use client"
import React from 'react'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
export const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarlinks=sidebarLinks
  console.log(sidebarlinks);
  
  // const pathname=usePathname()
  return (
    <div className="bg-gray-50 dark:bg-gray-950 h-full w-[30vw] min-w-[280px] border border-sky-500 rounded dark:border-gray-800 p-6 flex flex-col gap-6 sticky left-0 top-0 bottom-0">
      {
        sidebarlinks.map((link,index)=>{
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link href={link.route} key={index} ><Button variant="outline" className={cn("flex items-center w-full  justify-center gap-2",{
              'bg-sky-500 text-white hover:bg-sky-600':isActive,
            })}>
      {/* <TrashIcon className="h-4 w-4" /> */}
      {link.label}
    </Button></Link>
          )
        })
      }
    
    
  </div>
  )
}

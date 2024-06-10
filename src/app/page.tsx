import React from 'react'
import { auth } from '../auth';
import Navbar from '@/components/Navbar';

const page =async () => {
  const session = await auth();
  return (
    <Navbar/>
  )
}

export default page
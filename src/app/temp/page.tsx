// "use client"
import React from 'react'
import { auth } from '../../auth';
// import { auth } from './auth';

const page =async () => {
  const session = await auth();
  return (
    <div>{session?.user?.name}</div>
  )
}

export default page
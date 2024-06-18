"use client"

import React from 'react'
import { Button } from './ui/button'
import { signout } from '@/actions/user.actions'


const SignOutButton = () => {
  return (
    <Button className="text-white transition-colors bg-inherit hover:text-dc3  hover:bg-dc2 rounded-lg px-3 py-2 m-1" onClick={() => signout()}>Logout</Button>
  )
}

export default SignOutButton
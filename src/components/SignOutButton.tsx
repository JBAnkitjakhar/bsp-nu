"use client"

import React from 'react'
import { Button } from './ui/button'
import { signout } from '@/actions/user.actions'


const SignOutButton = () => {
  return (
    <Button onClick={() => signout()}>Logout</Button>
  )
}

export default SignOutButton
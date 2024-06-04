"use client"
import { signInWithCreds } from '@/actions/user.actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import React from 'react'
import { date } from 'zod'

const Clientform = () => {
    const {toast}=useToast()
    const router=useRouter()
  return (
    <form action={async(formdata)=>{
        const email=formdata.get("email") as string
        const password=formdata.get("password") as string
        console.log(email);
        if(!email|| !password){
            toast({
                description: "please provide all fields",
                
              });
            return;
        }
        await signInWithCreds(email,password).then((data)=>{
          if(data?.error){
            toast({
              description: String(data.error),
              
            });
            
          }
          else{
            toast({
              description: "Login Successfully",
              
            });
            router.refresh()
            router.push("/")
          }
          
        })
        // const error=await signInWithCreds(email,password)
        // if(!error){
        //     toast({
        //         description: "Login Successfully",
                
        //       });
        //       router.refresh()
        // }
        // else{
        //     toast({
        //         description: String(error),
                
        //       });
        // }

    }}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="Enter Your Email"
                  
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  placeholder="Enter the Password"
                  type="password"
                 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Button type="submit">Login</Button>
              </div>
              
            </div>
          </form>
  )
}

export default Clientform
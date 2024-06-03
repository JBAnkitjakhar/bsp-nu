import * as React from "react"
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { signInWithCreds } from "@/actions/user.actions"
export function LoginForm() {
  const loginaction=async(formdata:FormData)=>{
    "use server"
    const email=formdata.get("email") ;
    const password=formdata.get("password");
    console.log(email)
    console.log(password)

    const response = await signInWithCreds(email,password) as any;
    // console.log(response);
    
    if (response?.error) {
      alert("Error");
      return;
    }

    if (!response?.error) {
      redirect("/");
    }

    alert("You are now signed in!");
  }
  return (
    <div className="flex h-screen justify-center items-center">
    <Card className="w-[350px] ">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={loginaction}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" placeholder="Enter Your Email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" placeholder="Enter the Password" />
            </div>
            <div className="flex flex-col space-y-1.5">
             
        <Button type="submit">Login</Button>
            </div>
          </div>
          
        </form>
      </CardContent>
      
    </Card>
    </div>
  )
}

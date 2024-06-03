
'use server'

import { signIn, signOut } from "@/app/auth";
import { User } from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";

// import { signIn, signOut } from "@/auth";

export const signInWithGoogle = async () => {
    await signIn("google");
}

export const signinWithGitHub = async () => {
    await signIn("github");
}

export const signout = async () => {
    await signOut();
}

export const signInWithCreds = async (email: string, password: string, redirect: boolean = false) =>  {
    try {
        
        const response=await signIn("credentials", {
            email,
            password,
            redirect
        })
        return response;
    } catch (error) {
        return error
    }
}

import { useToast } from "@/components/ui/use-toast"



interface User {
  name: string;
  email: string;
  password: string;
  userType: string;
}

export async function registerUser(formData: FormData): Promise<any> {
  try {
    // await connectToDB()

    const user: User = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      userType: formData.get('userType') as string,
    };
    console.log(user);
    
    // const newuser=await User.create(user);
    // if(newuser)
        // toast({
        //     title: "Scheduled: Catch up",
        //     description: "Friday, February 10, 2023 at 5:57 PM",
        //   })
    // toast.success('Registration successful!', {
    //   duration: 3000,
    //   position: 'top-right',
    // });
    return user;
  } catch (error) {
    // toast.error(`Error registering user: ${error.message}`, {
    //   duration: 3000,
    //   position: 'top-right',
    // });
    // toast({
    //     description: "Your message has been sent.",
    //   })

  } 
}
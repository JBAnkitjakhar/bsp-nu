
'use server'

import { signIn, signOut } from "@/app/auth";

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
import NextAuth, { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectToDB from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
class InvalidLoginError extends CredentialsSignin {
    cause = "Invalid identifier or password"
  }

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        GitHub,
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                // const client = await clientPromise;
                // const db = client.db() as any;
                await connectToDB()

                const user = await User.findOne({ email: credentials?.email });
                // console.log(user);
                if(!user){
                    throw new CredentialsSignin("invalid email or password");
                    return null
                }
                
                const bcrypt = require("bcrypt");
                
                const passwordCorrect = await bcrypt.compare(
                    credentials?.password,
                    user?.password
                );
                
                if (passwordCorrect) {
                    return user
                    
                }
                
                throw new CredentialsSignin("Invalid email or password");
                return null
                

            },
        }),
    ],
    pages:{
        signIn:'/login',
    },
    //   adapter: MongoDBAdapter(clientPromise),
    callbacks: {
        jwt: async ({ user, token, trigger, session }) => {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
    },
});

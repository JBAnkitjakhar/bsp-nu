import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectToDB from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";
import { authConfig } from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: {
        strategy: 'jwt',
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
                await connectToDB();
                const user = await User.findOne({ email: credentials?.email });
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                const bcrypt = require("bcrypt");
                const passwordCorrect = await bcrypt.compare(
                    credentials?.password,
                    user?.password
                );
                if (passwordCorrect) {
                    return user;
                }
                throw new Error("Invalid email or password");
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt: async ({ user, token, trigger, session }) => {
            if (trigger === "update" && session?.user) {
                return { ...token, ...session.user };
            }
            
            if (user) {
                token.userType = (user  as any).userType;
            }
            return token;
        },
        session: async ({ session, token }) => {
            // if (token) {
            //     session.user.userType = token.userType;
            // }
            return session;
        },
        cookies: {
            sessionToken: {
              name: `next-auth.session-token1`,
              options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
              },
            },
            callbackUrl: {
              name: `next-auth.callback-url`,
              options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
              },
            },
            csrfToken: {
              name: `next-auth.csrf-token`,
              options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
              },
            },
          },
    },
    
   
});
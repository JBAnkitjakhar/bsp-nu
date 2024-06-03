import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import connectToDB from "@/lib/mongoose";
import { User } from "@/lib/models/user.model";


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
                try {
                    await connectToDB()

                    const user = await User.findOne({ email: credentials?.email });
                    console.log(user);

                    const bcrypt = require("bcrypt");

                    const passwordCorrect = await bcrypt.compare(
                        credentials?.password,
                        user?.password
                    );

                    if (passwordCorrect) {
                        return {
                            id: user?._id,
                            email: user?.email,
                            name: user?.name,
                            userType: user?.userType
                        };
                    }

                    // console.log("credentials", credentials);
                    return null;

                } catch (error) {
                    return {error}
                }

            },
        }),
    ],
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

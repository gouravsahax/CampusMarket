import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { configDotenv } from "dotenv";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter : PrismaAdapter(prisma),
    session : {strategy : "jwt"},
    providers : [Google({
        clientId : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET
    })]
})
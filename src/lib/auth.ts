import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    // connect app to db
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    // use custom page
    pages: {
        signIn: "/sign-in",
    },

    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "test@email.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            if(!credentials?.email || !credentials.password){
                return null
            }

            const existingUser = await db.user.findUnique({
                where: {email: credentials?.email}
            })
            if (!existingUser) {
                return null;
                
            }

            const passwordMatch = await compare(credentials.password, existingUser.password);

            if (!passwordMatch) {
                return null;
            }

        // Assuming username in the User type is non-nullable
        if (existingUser.username === null) {
            return null;
        }

            return {
                id: `${existingUser.id} `,
                username: existingUser.username,
                email: existingUser.email,
            }
          }
        })
      ],
    callbacks: {
        async jwt({ token, user }) {
            if(user){
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        }, 
    }
}
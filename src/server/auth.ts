import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";



import { env } from "~/env";
import { db } from "~/server/db";

import { PrismaClient } from  "@prisma/client";
const prisma = new PrismaClient();

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      id: string;
      role: string;
      nim: string;
      password: string;
      // ...
      // ...other properties
      // role: UserRole;
     } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    nim: string;
    password: string;
    // ...other properties
    // role: UserRole;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    nim: string;
    password: string;
    accessToken: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.nim = user.nim
        token.role = user.role
      }
      return token
    },
    async session({ token, session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
          session.accessToken = token.accessToken
          session.user.id = token.id
          session.user.nim = token.nim
          session.user.role = token.role
          
      }
      return session
    }
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),
  },
  adapter: PrismaAdapter(db) as Adapter,  
  providers: [    
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
         const {nim, password} = credentials as {nim: string, password: string}
          const user = await prisma.user.findUnique({ 
              where: {
                nim: nim
              },
            })
    
            if (!user) {//check whether NIM exist
              return null
              // throw new Error("No user found");
             } 
            if (password !== user.password) {//check whether password with associated NIM is correct
              return null
              // throw new Error("Invalid credentials"); 
            }
            console.log("user credentials logged in --------------------------------------------------")
            console.log(user)
            /* eslint-disable-next-line */
            return user as any
        }
    })
  ],
  pages: {
    signIn: '/authpage/login'
}
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

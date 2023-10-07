import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import decrypt from "@/app/lib/decrypt"
import prisma  from "@/app/lib/prisma";
import { INFO_LEVEL } from "@/app/helpers/constants";

const handler  = NextAuth({
    providers : [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              const {...data } = decrypt(credentials.encryptedData)
              const res = await fetch(`${process.env.LOCAL_API}/api/login`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    username : data?.username,
                    password : data?.password
                })
              })
              const user = await res.json();
              if (user) {
                await prisma.logEntry.create({
                data : {
                    action_name : "UserLogon",
                    action_by : user?.name,
                    message : `Acccount ${user?.name} has been logged-in.`,
                    level : INFO_LEVEL
                  }
                })
                
                return user
              } else {
                await prisma.logEntry.create({
                  data : {
                    action_name : "UserLogon",
                    action_by : data?.username,
                    message : `FAILED : Login attempt for ${data?.username}`,
                    level : INFO_LEVEL
                  }
                })
                return null
              }
            }
          })
    ],
    session: {
      maxAge: 60 * 60, // 1 Hour
      updateAge: 60 * 60, // 1 Hour
    },
    callbacks : {
      async jwt({token, user}){
        return ({...token, ...user})
      },
      async session({session, token, user}){
        session.user = token;
        return session;
      }
    },
    pages: {
      signIn : "/login",
    }
})

export { handler as GET, handler as POST}
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import decrypt from "@/app/lib/decrypt"
import prisma  from "@/app/lib/prisma";
import { INFO_LEVEL , ADMIN_USER_TYPE, HIGH_LEVEL } from "@/app/helpers/constants";

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

                if(user?.role === ADMIN_USER_TYPE){
                  await prisma.logEntry.create({
                    data : {
                        action_name : "AdminLogon",
                        action_by : user?.name,
                        message : `Admin Acccount has been access with ${user?.email}.`,
                        level : HIGH_LEVEL
                      }
                    })
                } else{
                  await prisma.logEntry.create({
                    data : {
                        action_name : "UserLogon",
                        action_by : user?.name,
                        message : `Acccount ${user?.name} has been logged-in.`,
                        level : INFO_LEVEL
                      }
                    })
                }

                

                // Update the last login timestamp
                await prisma.user.update({
                  where: {
                    id: user.id,
                  },
                  data: {
                    lastLogin: new Date(),
                  },
                });
                
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
      maxAge: 6 * 60 * 60, // 1 Hour
      updateAge: 6 * 60 * 60, // 1 Hour
    },
    callbacks : {
      async jwt({token, user}){
        return ({...token, ...user})
      },
      async session({session, token, user}){
        session.user = token;
        return session;
      },
      // async signOut({ token, session }) {
      //   console.debug("Sign Out")
      //   // if (user) {
      //   //   await prisma.logEntry.create({
      //   //     data : {
      //   //         action_name : "UserLoggoff",
      //   //         action_by : user?.name,
      //   //         message : `Acccount ${user?.name} has been logged-out.`,
      //   //         level : INFO_LEVEL
      //   //       }
      //   //     })
      //   // }
  
      //   // Perform the actual sign-out action (e.g., destroying the session)
      //   return true;
      // },
      
    },
    pages: {
      signIn : "/login",
    }
})

export { handler as GET, handler as POST}
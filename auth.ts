import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { db } from "@/lib/db";
import authConfig from "@/auth.config"; 

export const { 
    handlers : { GET, POST },
    auth,
    signIn,
    signOut,
    } = NextAuth({    
    callbacks: {
        async session({ session, token }) {
            console.log({sessionToken: token,session})
            return session;
        },
        async jwt({ token }) {
            // Add access_token to the token right after signin
            token.customField = "You can customField";
            console.log({ token });
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})

// export const { auth, handlers, signIn, signOut } = NextAuth({
//   providers: [GitHub, Google],
// });

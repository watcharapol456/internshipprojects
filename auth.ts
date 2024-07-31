
import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {db} from "@/db/index"
 
export const{
    handlers : {GET , POST},
    auth,signIn,signOut
} = NextAuth({
    callbacks:{
        async session({token,session}){
            if(token.sub && session.user){
                session.user.id = token.sub;
                session.user.name = token.name;
            }
            return session
        },
        async jwt ({token , user}){
            if(user?.id){
                token.id =user.id
                token.name = user.name;
            }
            return token
        },
    },
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})

import db from "@/db";
import { users } from "@/db/schema";
import { eq} from 'drizzle-orm';


export const getUserByUsername = async (username : string) =>{
    try{
        const user = await db.select().from(users).where(eq(users.username, username));

        return user;
    }catch{
        return null;
    }
}

export const getUserById = async (id : string) =>{
    try{
        const user = await db.select().from(users).where(eq(users.id, id));

        return user;
    }catch{
        return null;
    }
}
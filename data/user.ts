"use server"

import db from "@/db";
import { users } from "@/db/schema";
import { eq } from 'drizzle-orm';


export const getUserByUsername = async (username: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.username, username)).execute();
        return user[0] || null;  
    } catch (error) { 
        console.error("Error fetching user by username:", error);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.id, id)).limit(1).execute();
        return user[0] || null; 
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}

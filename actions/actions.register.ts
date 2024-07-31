"use server";

import { RegisterSchema, users } from "@/db/schema";
import * as z from "zod";
import bcrypt from "bcryptjs";
import db from "@/db";
import { eq,or } from "drizzle-orm";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    email: vEmail,
    password: vPassword,
    username: vUser,
    name : Vname
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(vPassword, 10);


  const existingUser = await db.query.users.findMany({
    where: (users, { eq, or }) => or(
      eq(users.email, vEmail),
      eq(users.username, vUser),
      eq(users.name,Vname),
    ),
  });
  

  console.log("DEBUG, existingUsers", existingUser);
  console.log("DEBUG Type", typeof existingUser);

  
  if (existingUser.length > 0) {
    return { error: "Username or email already in use!" };
  }

  console.log("DEBUG after,existinguser" ,existingUser)

  
  await db.insert(users).values({
    username: vUser,
    email: vEmail,
    name: Vname ,
    password: hashedPassword,
  });

  return { success: "User registered successfully!" };

};

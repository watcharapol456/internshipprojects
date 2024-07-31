import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./db/schema";

export default {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[DEBUG] start 1");

        const validatedFields = LoginSchema.safeParse(credentials);

        console.log("[DEBUG] start 2");

        if (validatedFields.success) {
          console.log("[DEBUG] start 3");

          const { username, password } = validatedFields.data;

          const values = {
            username: username,
            password: password,
          };

          console.log("[DEBUG] values auth", values);

          const responseAuth = await fetch("http://localhost:3000/api/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          console.log("[DEBUG] start 4");

          console.log("[DEBUG] responesAuth before", responseAuth);

          if (!responseAuth.ok) {
            console.error("Authentication failed:", responseAuth.statusText);
            return null;
          }

          console.log("[DEBUG] responesAuth after", responseAuth);

          try {
            // ดึงข้อมูล JSON จากการตอบกลับของ API
            const { success, user, error } = await responseAuth.json();

            // ตรวจสอบว่า `user` และ `password` มีค่าที่ไม่เป็น null หรือ undefined
            if (!user || error) return null;

            if (success && user) {
              console.log("[DEBUG] start 5", user);
              return JSON.parse(user);
            } else {
              return null
            }

            console.log("[DEBUG] start 6");

            // ! compare ใน api แล้ว ไม่ต้อง compare ที่นี่อีก
            // const passwordsMatch = await bcrypt.compare(
            //   password,
            //   user.password
            // );

            console.log("[DEBUG] start 7");
            // console.log("Password match result:", passwordsMatch);

            if (success && user) {
              // หากรหัสผ่านตรงกัน, ส่งคืนข้อมูลผู้ใช้
              return JSON.parse(user);
            } else {
              // หากรหัสผ่านไม่ตรงกัน, ส่งคืน null
              return null;
            }
          } catch (error) {
            console.log("Error in authorize:", error);
            return null; // ในกรณีที่เกิดข้อผิดพลาด, ส่งคืน null
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

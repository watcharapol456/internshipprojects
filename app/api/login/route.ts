import db from "@/db";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("[DEBUG] api 1");
    if (!req) {
        return NextResponse.json({
            success: false,
            error: "Unauthorized"
        }, {
            status: 403
        });
    }

    console.log("[DEBUG] api 2");
    try {
        const { username, password } = await req.json();

        console.log("[DEBUG]", { value: username, pin: password });

        const existingUser = await db.select().from(users).where(
            and(
                eq(username, users.username)
            )
        ).execute();

        // if (existingUser.length > 0) {
        //     const passwordsMatch = await bcrypt.compare(password, existingUser[0].password);

            console.log("[DEBUG]", {existingUser: existingUser[0]});

            if (existingUser.length > 0) {
                return NextResponse.json({
                    success: true,
                    user: JSON.stringify(existingUser[0])
                });
            } else {
                return NextResponse.json({
                    success: false,
                    error: "Password mismatch"
                }, {
                    status: 422
                });
            }
        // }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({
            success: false,
            error: "Something went wrong at server site"
        }, {
            status: 500
        });
    }
}
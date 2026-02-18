import { NextResponse } from "next/server";
import { signJWT } from "@/utils/auth";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password are required" },
        { status: 400 },
      );
    }

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      console.error("ADMIN_USERNAME or ADMIN_PASSWORD not set in env");
      return NextResponse.json(
        { success: false, error: "Server Configuration Error" },
        { status: 500 },
      );
    }

    if (username === adminUsername && password === adminPassword) {
      // Generate JWT
      // We can use a static ID since there's only one admin, or just omit ID.
      const token = await signJWT({ username: adminUsername, role: "admin" });

      // Create response with cookie
      const response = NextResponse.json({ success: true });

      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
        sameSite: "strict",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { signJWT } from "@/utils/auth"; // Assuming alias works, or use "../../utils/auth" if needed

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

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = await signJWT({ username });
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

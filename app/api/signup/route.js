"use server";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const dataFile = path.join(process.cwd(), "data", "users.txt");
    const { username, password, displayName, gender } = await req.json();

    if (!username || !password || !displayName || !gender) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // 🔹 Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = `${username},${hashedPassword},${displayName},${gender}\n`;

    fs.appendFileSync(dataFile, newUser, "utf8");

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

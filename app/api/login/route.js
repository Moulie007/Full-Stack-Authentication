import { NextResponse } from "next/server";
import fs from "fs/promises";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    const filePath = "data/users.txt";

    // Read file
    let fileData;
    try {
      fileData = await fs.readFile(filePath, "utf-8");
    } catch (err) {
      if (err.code === "ENOENT") {
        return NextResponse.json({ message: "No users found" }, { status: 400 });
      }
      throw err;
    }

    const users = fileData.trim().split("\n").map((line) => {
      const [storedUsername, storedHashedPassword, displayName, gender] = line.split(",");
      return { username: storedUsername, password: storedHashedPassword, displayName, gender };
    });

    // Find the user
    const user = users.find((user) => user.username === username);
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", displayName: user.displayName });

  } catch (error) {
    return NextResponse.json({ message: "Error logging in", error: error.message }, { status: 500 });
  }
}



import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User.js";
import { unsubscribe } from "diagnostics_channel";

// Register a new user
export async function RegisterUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    // 1. Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create the user in the database
    const user = await User.create({ name, email, passwordHash });

    // 5. Create a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env["JWT_SECRET"] as string,
      { expiresIn: "7d" }
    );

    // 6. Return success response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

// Login a user

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // validate fields

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const user =  await User.findOne( {email})
    if (!user) {
        return res.status(401).json( {message: "Invalid email or password"});
    }

    const isPasswordValid  =  await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        return res.status(401).json( {message: "Invalid email or password"})
    }

   const token = jwt.sign(
    { userId: user._id },
    process.env["JWT_SECRET"] as string,
    { expiresIn: "7d" }
   );

   return res.status(200).json({
     message: "Login successful",
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
     },
     token,
   });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}

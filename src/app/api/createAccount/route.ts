import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

interface registerProps {
  email: string
  password: string
}

export const POST = async (request: NextRequest) => {
  const { email, password }:registerProps = await request.json();
  await connectToDatabase();
  const existingUser = await User.findOne({email: email});

  if (existingUser) {
    return NextResponse.json({message: "Email is already in use"}, {status: 400})
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({email: email, password: hashedPassword});
  try {
    await newUser.save();
    return NextResponse.json({message: "User was successfully registered"}, {status: 200})
  } catch (error: any) {
    return NextResponse.json(error, {status: 500})
  }
}
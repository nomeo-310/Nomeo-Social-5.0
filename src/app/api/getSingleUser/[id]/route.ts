import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {
  await connectToDatabase();

  const userId = request.url.split('http://localhost:3000/api/getSingleUser/')[1];

  try {
    const user:any = await User.findOne({_id: userId})
    return NextResponse.json(user, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
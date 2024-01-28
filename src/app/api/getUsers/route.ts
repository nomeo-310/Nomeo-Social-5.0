import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse,) => {
  await connectToDatabase();

  const pageNumber:number = Number(request.url.split('http://localhost:3000/api/getUsers?page=')[1]);
  const pageSize:number = 6;
  const skip:number = (pageNumber - 1) * pageSize;

  try {
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / pageSize);
    const users = await User.find().skip(skip).limit(pageSize);

    return NextResponse.json({users, totalPages}, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
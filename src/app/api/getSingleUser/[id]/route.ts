import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request:NextRequest, {params}:{params: {id: any}}) => {
  const userId = params.id;

  await connectToDatabase();

  try {
    const user:any = await User.findOne({_id: userId})
    return NextResponse.json(user, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
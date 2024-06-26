import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {
  await connectToDatabase();

  try {
    const posts = await Post.find().sort({updatedAt:-1})
    
    return NextResponse.json(posts, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
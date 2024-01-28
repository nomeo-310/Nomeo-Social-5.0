import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {

  const postAuthorId = request.url.split('http://localhost:3000/api/getAllUserPosts/')[1];

  await connectToDatabase();

  try {
    const posts = await Post.find({postAuthorId: postAuthorId}).sort({updatedAt:-1})
    return NextResponse.json(posts, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
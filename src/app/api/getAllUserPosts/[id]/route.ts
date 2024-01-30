import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request:NextRequest, {params}:{params: {id: string}}) => {
  const postAuthorId = params.id;

  await connectToDatabase();

  try {
    const posts = await Post.find({postAuthorId: postAuthorId}).sort({updatedAt:-1})
    return NextResponse.json(posts, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
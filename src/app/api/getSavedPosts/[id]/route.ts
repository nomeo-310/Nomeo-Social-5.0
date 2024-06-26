import Post from "@/models/Post";
import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, {params}:{params: {id: string}}) => {
  await connectToDatabase();
  const userId = params.id

  const user = await User.findById(userId);
  if (user) {
    try {
      const posts = await Promise.all(user.savedPosts.map((id:any) => Post.findById(id)))
      const formattedPosts = posts.map(({_id, postStatus, hashTag, postImage, postAuthorProfilePicture, postMessage, postLocation, postAuthor, postAuthorId, isSavedPost, likes, savedPosts, updatedAt}) => {
        return {_id, postStatus, hashTag, postImage, postAuthorProfilePicture, postMessage, postLocation, postAuthor, postAuthorId, isSavedPost, likes, savedPosts, updatedAt}
      })
      return NextResponse.json(formattedPosts, {status: 200})
    } catch (error:any) {
      return NextResponse.json(error, {status: 500})
    }
    
  }
}

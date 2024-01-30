import Post from "@/models/Post";
import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const PUT = async (request: NextRequest, {params}:{params: {id: string}}) => {
  const { userId }:any = await request.json();
  const postId = params.id

  await connectToDatabase();

  const user = await User.findById(userId);
  const post = await Post.findById(postId)

  if (user && post) {
    try {
      post.savedPosts.push(userId);
      post.isSavedPost = true;
      user.savedPosts.push(postId);
      await post.save({timestamps: false});
      await user.save({timestamps: false});
      return NextResponse.json({message: `You have successfully saved one of ${post.postAuthor}'s post`}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }
  } else {
    return NextResponse.json({message: "It's either the user or the post does not exist"}, {status: 400})
  }
}
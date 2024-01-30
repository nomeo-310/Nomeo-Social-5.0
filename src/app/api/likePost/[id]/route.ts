import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const PUT = async (request: NextRequest, {params}:{params: {id: string}}) => {
  const { userId }:any = await request.json();
  
  const postId = params.id;

  await connectToDatabase();

  const post = await Post.findById(postId);

  if (post) {
    const userAlreadyLiked = post.likes.includes(userId)
    if (userAlreadyLiked) {
      try {
        post.likes.pull(userId)
        await post.save({timestamps: false});
        return NextResponse.json({message: `You just unliked ${post.postAuthor}'s post`}, {status: 200})
      } catch (error) {
        return NextResponse.json(error, {status: 500})
      }
    } else {
      try {
        post.likes.push(userId)
        await post.save({timestamps: false});
        return NextResponse.json({message: `You just liked ${post.postAuthor}'s post`}, {status: 200})
      } catch (error) {
        return NextResponse.json(error, {status: 500})
      }
    }
  } else {
    return NextResponse.json({message: "It's either the user or the post does not exist"}, {status: 400})
  }
}
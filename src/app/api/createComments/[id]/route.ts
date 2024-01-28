import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";

interface commentDataProps {
  profileImage: string
  comment: string
  commentAuthor: string
  commentTime: string
}


export const PUT = async (request: NextRequest) => {
  const { profileImage, comment, commentAuthor, commentTime }:any = await request.json();

  const commentData:commentDataProps = {profileImage: profileImage, comment: comment, commentAuthor: commentAuthor, commentTime: commentTime}
  
  const postId = request.url.split('http://localhost:3000/api/createComments/')[1];

  await connectToDatabase();

  const post = await Post.findById(postId)

  if (post) {
    try {
      post.comments.push(commentData)
      post.save({timestamps: false})
      return NextResponse.json({message: "Comment successfully posted"}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }

  } else {
    return NextResponse.json({message: "The post does not exist"}, {status: 400})
  }
}
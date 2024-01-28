import User from "@/models/User";
import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { postProps } from "@/types/types";



export const POST = async (request: NextRequest) => {
  const { postStatus, hashTag, postImage, postAuthorProfilePicture, postMessage, postLocation, postAuthor, postAuthorId }:postProps = await request.json();
  await connectToDatabase();

  const user:any = await User.findById(postAuthorId);
  const postDoc = {
    postStatus: postStatus,
    hashTag: hashTag,
    postImage: postImage,
    postAuthor: postAuthor,
    postAuthorId: postAuthorId,
    postAuthorProfilePicture: postAuthorProfilePicture,
    postMessage: postMessage,
    postLocation: postLocation,
  }

  if (user) {
    try {
      const newPost = new Post(postDoc)
      await newPost.save();
      user.createdPosts.push(newPost._id as string);
      await user.save();
      return NextResponse.json({message: "Post successfully created"}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }
  } else return NextResponse.json({message: "Post author does not exist"}, {status: 400})
}
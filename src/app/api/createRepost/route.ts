import User from "@/models/User";
import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { rePostProps } from "@/types/types";



export const POST = async (request: NextRequest) => {
  const { originalPostId, originalPostTime, isRepost, postStatus, hashTag, postImage, postAuthorProfilePicture, postMessage, postLocation, postAuthor, originalAuthor, postAuthorId, originalAuthorId, originalAuthorProfilePicture }:rePostProps = await request.json();
  await connectToDatabase();

  const user:any = await User.findById(postAuthorId);
  const originalPost:any = await Post.findById(originalPostId)

  const repostDoc = {
    postStatus: postStatus,
    hashTag: hashTag,
    postImage: postImage,
    postAuthor: postAuthor,
    postAuthorId: postAuthorId,
    postAuthorProfilePicture: postAuthorProfilePicture,
    postMessage: postMessage,
    postLocation: postLocation,
    originalAuthor: originalAuthor,
    originalPostId: originalPostId,
    originalPostTime: originalPostTime,
    isRepost: isRepost,
    originalAuthorId: originalAuthorId,
    originalAuthorProfilePicture: originalAuthorProfilePicture
  }

  if (user && originalPost) {
    try {
      const newPost = new Post(repostDoc)
      await newPost.save();
      user.createdPosts.push(newPost._id);
      originalPost.reposts.push(newPost._id)
      await user.save();
      await originalPost.save({timestamps: false});
      return NextResponse.json({message: `You successfully reposted ${originalAuthor}'s post`}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }
  } else return NextResponse.json({message: "Either post or the user does not exist"}, {status: 400})
}
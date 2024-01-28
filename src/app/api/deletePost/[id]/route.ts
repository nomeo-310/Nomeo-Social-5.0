import mongoose from "mongoose";
import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import User from "@/models/User";


export const DELETE = async (request: NextRequest, response: NextResponse) => {

  const id = request.url.split('http://localhost:3000/api/deletePost/')[1];
  const postId =  mongoose.mongo.BSON.ObjectId.createFromHexString(id)
  await connectToDatabase();
  const post = await Post.findById(postId);
  if (post) {
    const oldImage = post.postImage.url !== "";
    const postAuthorId = post.postAuthorId;

    if (oldImage) {
      cloudinary.uploader.destroy(post.postImage.public_id)
        .then((resp: any) => console.log(resp))
        .catch((_err: any) => console.log("Something went wrong, please try again later."));
    }
    try {
      const user:any = await User.findOneAndUpdate({_id: postAuthorId},{$pull:{createdPosts: postId}}, {timestamps:false});
      user.save();
      await post.deleteOne();
      return NextResponse.json({message: "Post successfully deleted"}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }
  } else {
    return NextResponse.json({message: "Post does not exist"}, {status: 400})
  }
}
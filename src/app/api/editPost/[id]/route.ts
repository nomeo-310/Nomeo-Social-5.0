import Post from "@/models/Post";
import connectToDatabase from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";


export interface editPostProps {
  postStatus: string
  hashTag: string,
  postImage: { public_id: string, url: string }
  postMessage: string,
  postLocation: string,
}

export const PUT = async (request: NextRequest, {params}:{params: {id: string}}) => {
  const { postStatus, hashTag, postImage, postMessage, postLocation }:editPostProps = await request.json();

  const postId = params.id;
  await connectToDatabase();
  const post = await Post.findById(postId);
  if (post) {
    const imageIsSame = post.postImage.url === postImage.url;

    if (!imageIsSame) {
      cloudinary.uploader.destroy(post.postImage.public_id)
        .then((resp: any) => console.log(resp))
        .catch((_err: any) => console.log("Something went wrong, please try again later."));
      
        const updatePostData:editPostProps = {
          postStatus: postStatus,
          hashTag: hashTag,
          postImage: postImage,
          postMessage: postMessage,
          postLocation: postLocation
        }
      try {
        await Post.findOneAndUpdate({_id: postId}, {$set: updatePostData});
        return NextResponse.json({message: "Post successfully updated"}, {status: 200})
      } catch (error) {
        return NextResponse.json(error, {status: 500})
      }
    } else {
      const updatePostData:editPostProps = {
        postStatus: postStatus,
        hashTag: hashTag,
        postImage: postImage,
        postMessage: postMessage,
        postLocation: postLocation
      }
    try {
      await Post.findOneAndUpdate({_id: postId}, {$set: updatePostData});
      return NextResponse.json({message: "Post successfully updated"}, {status: 200})
    } catch (error) {
      return NextResponse.json(error, {status: 500})
    }
    }
  }
}
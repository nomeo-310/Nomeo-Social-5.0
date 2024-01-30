import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import cloudinary from "@/utils/cloudinary";
import { imageProps } from "@/types/types";



export const PUT = async (request: NextRequest, {params}:{params: {id: string}}) => {
  const userId = params.id;
  const { public_id, url }:imageProps = await request.json();
  await connectToDatabase();

  const updateData = { profileImage: { public_id: public_id, url: url }}

  const user:any = await User.findById(userId);
  const oldImage:any = user.profileImage;

  if (oldImage?.public_id !== '') {
    cloudinary.uploader.destroy(oldImage.public_id, function(error: any,result: any) {
      console.log(result, error) })
      .then((resp: any) => console.log(resp))
      .catch((_err: any)=> console.log("Something went wrong, please try again later."));
  }

  try {
    await User.findOneAndUpdate({_id: userId}, {$set: updateData})
    return NextResponse.json({message: "Profile Image successfully added"}, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
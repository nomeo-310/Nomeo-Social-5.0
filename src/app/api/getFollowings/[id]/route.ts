import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {
  await connectToDatabase();
  const userId = request.url.split('http://localhost:3000/api/getFollowings/')[1];

  const user = await User.findById(userId);
  if (user) {
    try {
      const followings = await Promise.all(user.followings.map((id:any) => User.findById(id)))
      const formattedFollowings = followings.map(({_id, surname, lastname, occupation, city, state, profileImage, username }) => {
        return {_id, surname, lastname, occupation, city, state, profileImage, username }
      })
      return NextResponse.json(formattedFollowings, {status: 200})
    } catch (error:any) {
      return NextResponse.json(error, {status: 500})
    }
    
  }
}
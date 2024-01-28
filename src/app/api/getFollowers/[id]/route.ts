import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const GET = async (request: NextRequest, response: NextResponse) => {
  await connectToDatabase();
  const userId = request.url.split('http://localhost:3000/api/getFollowers/')[1];

  const user = await User.findById(userId);
  if (user) {
    try {
      const followers = await Promise.all(user.followers.map((id:any) => User.findById(id)))
      const formattedFollowers = followers.map(({_id, surname, lastname, occupation, city, state, profileImage, username }) => {
        return {_id, surname, lastname, occupation, city, state, profileImage, username }
      })
      return NextResponse.json(formattedFollowers, {status: 200})
    } catch (error:any) {
      return NextResponse.json(error, {status: 500})
    }
    
  }
}

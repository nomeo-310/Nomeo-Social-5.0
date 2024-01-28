import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";


export const PUT = async (request: NextRequest) => {
  const { followId }:any = await request.json();
  const userId = request.url.split('http://localhost:3000/api/addFollower/')[1];

  await connectToDatabase();

  const user = await User.findById(userId);
  const following = await User.findById(followId)

  if (user && following ) {
    const alreadingFollowing = user.followings.includes(followId)
    if (alreadingFollowing) {
      try {
        user.followings.pull(followId);
        following.followers.pull(userId);
        await user.save({timestamps: false});
        await following.save({timestamps: false});
        return NextResponse.json({message: `You have unfollowed ${following.surname + ' ' + following.lastname}`}, {status: 200})
      } catch (error) {
        return NextResponse.json(error, {status: 500})
      }
    } else {
      try {
        user.followings.push(followId);
        following.followers.push(userId);
        await user.save({timestamps: false});
        await following.save({timestamps: false});
        return NextResponse.json({message: `You are now following ${following.surname + ' ' + following.lastname}`}, {status: 200})
      } catch (error) {
        return NextResponse.json(error, {status: 500})
      }
    }
  } else {
    return NextResponse.json({message: "It's either the user or the follower does not exist"}, {status: 400})
  }
}
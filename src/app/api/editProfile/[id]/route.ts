import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { editFormProps } from "@/types/types";



export const PUT = async (request: NextRequest) => {
  const { username, surname, lastname, status, address, hobbies, otherSocialProfiles, occupation, birthdate, birthday, age, city, state, mobileNumber, bio, interests}:editFormProps = await request.json();

  const updateData:editFormProps = { username: username, surname: surname, lastname: lastname, status: status, address: address, hobbies: hobbies, otherSocialProfiles: otherSocialProfiles, occupation: occupation, birthdate: birthdate, birthday: birthday, age: age, city: city, state: state, mobileNumber: mobileNumber, bio: bio, interests: interests }

  await connectToDatabase();

  const userId = request.url.split('http://localhost:3000/api/editProfile/')[1];

  try {
    await User.findOneAndUpdate({_id: userId}, {$set: updateData})
    return NextResponse.json({message: "Profile updated successfully"}, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
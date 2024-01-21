import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { formProps } from "@/types/types";


export const PUT = async (request: NextRequest) => {
  const { username, surname, lastname, gender, status, address, hobbies, otherSocialProfiles, profileCreated, occupation, birthdate, birthday, age, city, state, mobileNumber, bio, interests}:formProps = await request.json();

  const updateData:formProps = { username: username, surname: surname, lastname: lastname, gender: gender, status: status, address: address, hobbies: hobbies, otherSocialProfiles: otherSocialProfiles, profileCreated: profileCreated, occupation: occupation, birthdate: birthdate, birthday: birthday, age: age, city: city, state: state, mobileNumber: mobileNumber, bio: bio, interests: interests }

  await connectToDatabase();

  const userId = request.url.split('http://localhost:3000/api/createProfile/')[1];

  try {
    await User.findOneAndUpdate({_id: userId}, {$set: updateData})
    return NextResponse.json({message: "Profile created successfully"}, {status: 200})
  } catch (error:any) {
    return NextResponse.json(error, {status: 500})
  }
}
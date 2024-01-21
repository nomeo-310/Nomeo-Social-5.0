import type { NextAuthOptions } from "next-auth";
import bcrypt from 'bcryptjs'
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connectToDatabase from "@/libs/mongodb";
import { NextResponse } from "next/server";


export const options:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text"},
        password: { label: "password", type: "password"}
      },
      async authorize(credentials:any) {
        await connectToDatabase();
        try {
          const user:any = await User.findOne({email: credentials.email})
          if (user) {
            const passwordIsCorrect = await bcrypt.compare(credentials.password, user.password)
            if (passwordIsCorrect) {
              const newData = {
                _id: user._id,
                username:user.username,
                surname: user.surname,
                lastname: user.lastname,
                email: user.email,
                profileImage: user.profileImage,
                coverImage: user.coverImage,
                gender: user.gender,
                status: user.status,
                address: user.address,
                hobbies: user.hobbies,
                otherSocialProfiles: user.otherSocialProfiles, 
                profileCreated: user.profileCreated,
                savedPosts: user.savedPosts,
                reTweets: user.reTweets,
                occupation: user.occupation,
                birthday: user.birthday,
                birthdate: user.birthdate,
                age: user.age,
                city: user.city,
                followers: user.followers,
                followings: user.followings,
                state: user.state,
                mobileNumber: user.mobileNumber,
                bio: user.bio,
                createdPosts: user.createdPosts,
                interests: user.interests
              }
              return newData
            } else {
              throw new Error('Wrong password');
            }
          } else {
            throw new Error('Wrong email address');
          }
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }),
  ],
  pages: {
    signIn: '/loginUser'
  }, 
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt: async({token, user, trigger, session}) => {
      if (user) {
        return {
          ...token,
          user : user
        }
      }

      if (trigger === 'update' && session) {
        token = {...token, user: session.user}
        return token
      }
      return token;
    },
    session: async({session, token }: {session: any, token: any}) => {
      session.user = token.user
      return session;
    }
  }
}


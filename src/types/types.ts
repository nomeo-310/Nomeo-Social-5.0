import { ObjectId } from "mongoose"

export interface IUser {
  username:string
  surname: string
  lastname: string
  email: string
  password: string
  profileImage: {public_id: String, url: String}
  coverImage: {public_id: String, url: String}
  gender: string
  status: string
  address: string
  hobbies: string[]
  otherSocialProfiles: string[]
  profileCreated: boolean
  savedPosts: any[]
  reTweets: any[]
  occupation: string
  birthday: string
  birthdate: string
  age: string
  city: string
  followers:any[]
  followings:any[]
  state:string
  mobileNumber:string
  bio:string
  createdPosts: any[]
  interests: any[]
}

export interface IPost {
  postAuthor: string
  repostAuthor: string
  postAuthorId: string
  repostAuthorId: string
  postLocation: string
  postAuthorProfilePicture: string
  post: string
  postTags:string
  postStatus: string
  postImage: { public_id: string, url: string }
  comments:any[]
  likes: string[]
  reposts: string[]
  isRepost: boolean
  savedPosts: string[]
}

export interface IComment {}

export interface formProps {
  username:string
  surname: string
  lastname: string
  gender: string
  status: string
  address: string
  hobbies: string[]
  otherSocialProfiles: string[]
  profileCreated: boolean
  occupation: string
  birthdate: string
  birthday: string
  age: string
  city: string
  state:string
  mobileNumber:string
  bio:string
  interests: string[]
}

export interface editFormProps {
  username:string
  surname: string
  lastname: string
  status: string
  address: string
  hobbies: string[]
  otherSocialProfiles: string[]
  occupation: string
  birthdate: string
  birthday: string
  age: string
  city: string
  state:string
  mobileNumber:string
  bio:string
  interests: string[]
}

export interface newUser {
  _id: ObjectId
  username:string
  surname: string
  lastname: string
  email: string
  profileImage: string
  coverImage: string
  gender: string
  status: string
  address: string
  hobbies: string[]
  otherSocialProfiles: string[]
  profileCreated: boolean
  savedPosts: any[]
  reTweets: any[]
  occupation: string
  birthday: string
  birthdate: string
  age: string
  city: string
  followers:any[]
  followings:any[]
  state:string
  mobileNumber:string
  bio:string
  createdPosts: any[]
  interests: any[]
}
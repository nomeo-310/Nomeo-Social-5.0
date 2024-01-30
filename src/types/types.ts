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
  reTweets: string[]
  occupation: string
  birthday: string
  birthdate: string
  age: string
  city: string
  followers:string[]
  followings:string[]
  state:string
  mobileNumber:string
  bio:string
  createdPosts: any[]
  sharedPosts: any[]
  interests: string[]
}

export interface registerProps {
  email: string
  password: string
}

export interface IPost {
  postAuthor: string
  repostAuthor: string
  postAuthorId: string
  repostAuthorId: string
  postLocation: string
  postAuthorProfilePicture: string
  rePostAuthorProfilePicture: string
  postMessage: string
  hashTag:string
  postStatus: string
  postImage: { public_id: string, url: string }
  comments: [{profileImage: string, comment: string, commentAuthor: string, commentTime: string}]
  likes: string[]
  reposts: string[]
  isRepost: boolean
  savedPosts: string[]
  originalPostTime: Date
}

export interface rePostProps {
  postStatus: string
  hashTag: string,
  postImage: { public_id: string, url: string }
  postAuthorProfilePicture: string,
  postMessage: string,
  postLocation: string,
  postAuthorId: string,
  postAuthor: string,
  originalPostId: string
  originalPostTime: string
  isRepost: boolean
  originalAuthor: string
  originalAuthorId: string
  originalAuthorProfilePicture: string
}

export interface postProps {
  postStatus: string
  hashTag: string,
  postImage: { public_id: string, url: string }
  postAuthorProfilePicture: string,
  postMessage: string,
  postLocation: string,
  postAuthorId: string,
  postAuthor: string,
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

export interface imageProps {
  public_id: string
  url:string
}

export interface singlePostProps {
  _id: string
  postAuthor: string
  updatedAt: Date
  postImage: {public_id: string, url: string}
  postAuthorId: string
  postAuthorProfilePicture: string
  likes: string[]
  savedPosts: string[]
  hashTag: string
  postMessage: string
  comments: [{profileImage: string, comment: string, commentAuthor: string}]
  postLocation: string
  postStatus: string
  reposts: string[]
  isRepost: boolean
  originalAuthor: string
  originalAuthorId: string
  originalAuthorProfilePicture: string
  originalPostTime: Date
  setHideCreatePost: React.Dispatch<React.SetStateAction<boolean>>
}

export interface aboutProps {
  currentUser: currentUserProps
  isLoading: boolean
  setUserReady: React.Dispatch<React.SetStateAction<boolean>>
}

export interface itemProp {
  onClick: () => void
  itemName: string
}

export interface itemsProps {
  id: string
  checkedItem: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  icon: React.ReactNode
}

export interface currentUserProps {
  _id: string
username: string
surname: string
lastname: string
email: string
password: string
profileImage: {public_id: string, url: string}
coverImage: {public_id: string, url: string}
gender: string
status: string
hobbies: string[]
occupation: string
address: string
otherSocialProfiles: string[]
profileCreated: boolean
savedPosts: string[]
reTweets: string[]
followers: string[]
followings: string[]
birthdate: string
birthday: string
age: string
mobileNumber: string
city: string
state: string
bio: string
createdPosts: string[]
sharedPosts: string[]
interests: string[]
createdAt: Date
updatedAt: Date
}
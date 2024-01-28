import mongoose from 'mongoose';
import { Document , Schema } from 'mongoose';
import { IUser } from '@/types/types';

export interface IUserModel extends IUser, Document {};

const UserSchema:Schema = new Schema({
  username: { type: String, default: '' },
  surname: {type: String, default: '' },
  lastname: {type: String, default: '' },
  email: { type: String, require: true, unique:true },
  password: { type: String, require: true, unique:true},
  profileImage: { type: Object, default: { public_id: '', url: '' }},
  coverImage: { type: Object, default: { public_id: '', url: '' }},
  gender: { type: String, default: ''},
  status: { type: String, default: ''},
  hobbies: {type: Array, default: [] },
  occupation: { type: String, default: ''},
  address: { type: String, default: ''},
  otherSocialProfiles: { type: Array, default: [] },
  profileCreated:  { type: Boolean, default: false },
  savedPosts: { type: Array, default: [] },
  reTweets: { type: Array,default: [] },
  followers: { type: Array, default: [] },  
  followings: { type: Array,default: [] },
  birthdate: {type: String, default: ''},
  birthday: { type: String, default: ''},
  age: { type: String, default: ''},
  mobileNumber: { type: String, default: ''},
  city: { type: String, default: ''},
  state: { type: String, default: ''},
  bio:{ type: String, default: ''},
  createdPosts: {type: Array, default: []},
  sharedPosts: {type: Array, default: []},
  interests: {type: Array, default: []}
}, {timestamps: true}); 


(mongoose.models as any) = {};

const User = mongoose.model('User', UserSchema);

export default User;
import mongoose from 'mongoose';
import { Document , Schema } from 'mongoose';
import { IPost } from '@/types/types';

export interface IUserModel extends IPost, Document {};

const PostSchema:Schema = new Schema({
  postAuthor: { type: String, default: '' },
  repostAuthor: {type: String, default: '' },
  postAuthorId: {type: String, default: '' },
  postImage: { type: Object, default: { public_id: '', url: '' }},
  repostAuthorId: { type: String, default: ''},
  postLocation: { type: String, default: ''},
  postAuthorProfilePicture: { type: String, default: '' },
  comments: { type: Array, default: [] },
  isRepost:  { type: Boolean, default: false },
  likes: { type: Array, default: [] },
  reposts: { type: Array,default: [] },
  post: {type: String, default: ''},
  postTags: { type: String, default: ''},
  postStatus: { type: String, default: ''},
  savedPosts: {type: Array, default: []},
}, {timestamps: true}); 


mongoose.models = {};

const Post = mongoose.model('Post', PostSchema);

export default Post;
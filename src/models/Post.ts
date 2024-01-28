/* eslint-disable react-hooks/exhaustive-deps */

import mongoose from 'mongoose';
import { Document , Schema } from 'mongoose';
import { IPost } from '@/types/types';

export interface IUserModel extends IPost, Document {};

const PostSchema:Schema = new Schema({
  postAuthor: { type: String, default: '' },
  originalPostId: { type: String, default: '' },
  originalAuthor: {type: String, default: '' },
  postAuthorId: {type: String, default: '' },
  postImage: { type: Object, default: { public_id: '', url: '' }},
  originalAuthorId: { type: String, default: ''},
  postLocation: { type: String, default: ''},
  originalPostLocation: { type: String, default: ''},
  postAuthorProfilePicture: { type: String, default: '' },
  originalAuthorProfilePicture: { type: String, default: '' },
  comments: { type: Array, default: [{profileImage: '', comment: '', commentAuthor: '', commentTime: ''}]},
  isRepost:  { type: Boolean, default: false },
  isSavedPost:  { type: Boolean, default: false },
  isSharedPost:  { type: Boolean, default: false },
  likes: { type: Array, default: [] },
  reposts: { type: Array,default: [] },
  originalPostMessage: {type: String, default: ''},
  postMessage: {type: String, default: ''},
  originalHashTag: { type: String, default: ''},
  hashTag: { type: String, default: ''},
  postStatus: { type: String, default: ''},
  savedPosts: {type: Array, default: []},
  sharedPosts: {type: Array, default: []},
  sharedAuthors: {type: Array, default: []},
  originalPostTime: {type: Date, default: null}
}, {timestamps: true}); 


(mongoose.models as any) = {};

const Post = mongoose.model('Post', PostSchema);

export default Post;
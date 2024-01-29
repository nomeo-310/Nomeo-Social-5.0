import React from 'react'
import { FeedSinglePost } from './SinglePost';
import CreatePost from './CreatePost';
import CardComponent from './CardComponent';
import { singlePostProps } from '@/types/types';

interface feedsProps {
  data: singlePostProps[]
}

const Feeds = ({data}:feedsProps) => {
  const [hideCreatePost, setHideCreatePost] = React.useState(false);
  return (
    <React.Fragment>
      { hideCreatePost ? '' : <CreatePost/> }
      { data?.length < 1 ?
        <CardComponent>
          <h2 className='lg:text-base text-sm'>You have not created any post yet.</h2>
        </CardComponent> :
        data && data?.map((post:any, index:number) => (
        <FeedSinglePost {...post} key={`post_${index}`} setHideCreatePost={setHideCreatePost}/>
      ))}
    </React.Fragment>
  )
}

export default Feeds;
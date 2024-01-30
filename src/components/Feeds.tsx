import React from 'react'
import { FeedSinglePost } from './SinglePost';
import CreatePost from './CreatePost';
import CardComponent from './CardComponent';
import { singlePostProps } from '@/types/types';
import { FullScreenLoading } from './LoadingAnimation';

interface feedsProps {
  data: singlePostProps[]
  isLoading: boolean
}

const Feeds = ({data, isLoading}:feedsProps) => {
  const [hideCreatePost, setHideCreatePost] = React.useState(false);

  return (
    <React.Fragment>
      { hideCreatePost ? '' : <CreatePost/> }
      { isLoading ? <FullScreenLoading spinnerSize='70' minHeight='lg:min-h-[590px] min-h-[600px]'/> : 
        <React.Fragment>
          { data?.length < 1 ?
            <CardComponent>
              <h2 className='lg:text-base text-sm'>You have not created any post yet.</h2>
            </CardComponent> :
            data && data?.map((post:any, index:number) => (
            <FeedSinglePost {...post} key={`post_${index}`} setHideCreatePost={setHideCreatePost}/>
          ))}
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Feeds;
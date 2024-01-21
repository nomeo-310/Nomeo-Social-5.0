import React from 'react'
import SinglePost from './SinglePost';
import CreatePost from './CreatePost';
import CardComponent from './CardComponent';

interface feedsProps {
  data: any[]
}

const Feeds = ({data}:feedsProps) => {
  const [hideCreatePost, setHideCreatePost] = React.useState(false);
  return (
    <>
      { hideCreatePost ? '' : <CreatePost/> }
      {data.length < 1 ?
        <CardComponent>
          <h2>No Posts yet</h2>
        </CardComponent> :
      data.map((post:any, index:number) => (
        <SinglePost {...post} key={`post_${index}`} setHideCreatePost={setHideCreatePost}/>
      ))}
    </>
  )
}

export default Feeds;
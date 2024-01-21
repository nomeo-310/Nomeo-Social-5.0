import React from 'react'
import CardComponent from './CardComponent'
import ImageAvatar from './ImageAvatar'
import { AddUserOutlined, BookMarkFilled, BookMarkOutlined, CommentsOutlined, Delete, EditOutlined, Ellipsis, LikedFilled, LikedOutlined, SavedOutlined, SendOutlined, ShareForwardOutlined, UserOutlinedAlt } from './IconPacks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react'
import EditPost from './EditPost'
import { createHashTag } from '@/hooks/formatHasTag'

export type singlePostProps = {
  postAuthor: string
  postTime: string
  postImage: string
  postAuthorId: string
  postAuthorImage: string
  likes: number
  commentLength: number
  saves: number
  hashtag: string
  post: string
  comments: any[]
  currentCity: string
  currentState: string
  setHideCreatePost: React.Dispatch<React.SetStateAction<boolean>>
}

type menuItemProps = {
  children: React.ReactNode
  onClick: () => void
}

export const testPost = [
  {
    postAuthor: 'surname lastname',
    postTime: '15 minutes ago',
    postImage: '/images/signupBanner_1.jpg',
    postAuthorId: '659ee8f87faf72591b075af7',
    postAuthorImage: '',
    status: 'private',
    likes: 55,
    commentLength: 120,
    saves: 300,
    hashtag: 'iLove,iRock,iPreach,iGrace',
    post:'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!',
    comments: [
      {
        commentAuthor: '@surnamelastname33',
        commentTime: '10 minutes ago',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!'
      },
      {
        commentAuthor: '@surnamelastname89',
        commentTime: '30 minutes ago',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      },
      {
        commentAuthor: '@surnamelastname55',
        commentTime: '30 minutes ago',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!'
      },
    ],
    currentCity: 'Ikeja',
    currentState: 'Lagos'
  },
  {
    postAuthor: 'surname lastname',
    postTime: '15 minutes ago',
    postImage: '',
    postAuthorId: 2,
    postAuthorImage: '',
    status: 'public',
    likes: 45,
    commentLength: 90,
    saves: 400,
    hashtag: 'iLove,iRock,iPreach,iGrace',
    post:'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!',
    comments: [
      {
        commentAuthor: '@surnamelastname33',
        commentAuthorImage: '',
        commentTime: '10 minutes ago',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!'
      },
      {
        commentAuthor: '@surnamelastname55',
        commentAuthorImage: '',
        commentTime: '30 minutes ago',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A nisi rem assumenda architecto eligendi!'
      },
    ],
    currentCity: 'Akure',
    currentState: 'Ondo'
  },
];

const SinglePost = ({post, postAuthor, postAuthorId, postAuthorImage, postImage, postTime, saves, hashtag, comments, likes, commentLength, currentCity, currentState, setHideCreatePost}: singlePostProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [editPost, setEditPost] = React.useState(false);

  const {data: session}:any = useSession();
  
  const liked:boolean = true;
  const saved:boolean = true;

  const Menu = ({postAuthorId}:Partial<singlePostProps>):React.ReactElement => {
    const router = useRouter();
    const MenuItem = ({children, onClick}:menuItemProps)=> {
      return (
        <button className='lg:text-[14.5px] text-sm hover:text-white active:text-white w-full bg-inherit flex justify-between items-center hover:bg-tertiaryBlue rounded py-[3px] px-[6px] active:bg-tertiaryBlue' onClick={onClick}>
          {children}
        </button>
      )
    }
    return (
      <div className='flex-col min-w-[150px] lg:min-w-[170px] absolute top-7 right-0 flex gap-1 z-[2000] border bg-white dark:bg-[#3d3d3d] p-1 rounded shadow'>
        { postAuthorId === session?.user._id && 
        <>
          <MenuItem onClick={() => {setShowMenu(false), setEditPost(true)}}>
            <h2>Edit</h2>
            <EditOutlined className='w-4 h-4 md:w-5 md:h-5'/>
          </MenuItem>
          <MenuItem onClick={() => {setShowMenu(false), console.log('delete post')}}>
            <h2>Delete</h2>
            <Delete className='w-4 h-4 md:w-5 md:h-5'/>
          </MenuItem>
        </>
        }
        <MenuItem onClick={() => {setShowMenu(false), console.log('save post')}}>
          <h2>Save Post</h2>
          <SavedOutlined className='w-4 h-4 md:w-5 md:h-5'/>
        </MenuItem>
        <MenuItem onClick={() => {setShowMenu(false), console.log('following author')}}>
          <h2>Follow Author</h2>
          <AddUserOutlined className='w-4 h-4 md:w-5 md:h-5'/>
        </MenuItem>
        <MenuItem onClick={() => {setShowMenu(false), router.push(`/profile/${postAuthorId}`)}}>
          <h2>Checkout Author</h2>
          <UserOutlinedAlt className='w-4 h-4 md:w-5 md:h-5'/>
        </MenuItem>
      </div>
    )
  }

  const CommentSection = ({comments}:Partial<singlePostProps>):React.ReactElement => {
    const CreateComment = ()=> {
      const comment = useInput('');
      return (
        <form>
          <div className='lg:h-[55px] h-[45px] relative' onSubmit={() => console.log(comment.value)}>
            <div className='absolute -left-1 -top-1'>
              <ImageAvatar size='extraSmall' profilePicture={''}/>
            </div>
            <textarea name="" id="postMessage" className='border resize-none rounded h-full w-full lg:pl-[45px] lg:pr-8 pr-7 pl-[40px] p-2 outline-none focus:outline-none text-[13px] leading-[1.1] bg-inherit dark:placeholder:text-white' placeholder='say something...' value={comment.value} onChange={comment.onTextAreaChange}/>
            <button type='submit' className='absolute top-5 lg:top-7 right-3 z-[300]'>
              <SendOutlined className='w-5 h-5 text-primaryGreen'/>
            </button>
          </div>
        </form>
      )
    }
    return (
      <div className='mt-4'>
        <div className='mb-3'>
          <h2 className='mb-3'>Comments</h2>
          <div className='flex gap-3 flex-col'>
            {comments && comments.length > 0 && comments.map((e:any, index:number) => (
              <div className='lg:min-h-[35px] min-h-[30px] relative pt-[18px] border-b last:border-b-0' key={index}>
                <div className='absolute -left-1 -top-1 flex gap-2'>
                  <ImageAvatar size='extraSmall' profilePicture={e.commentAuthorImage}/>
                  <div>
                    <h2 className='text-xs'>{e.commentAuthor}</h2>
                    <h2 className='text-xs'>{e.commentTime}</h2>
                  </div>
                </div>
                <p className='mt-1 lg:mt-2 h-full w-full lg:pl-[45px] pl-[40px] p-2 md:text-sm text-xs'>{e.comment}</p>
              </div>
            ))}
          </div>
        </div>
        <CreateComment/>
      </div>
    )
  }

  const PostControls = ({likes, saves, commentLength}:Partial<singlePostProps>):React.ReactElement => {
    return (
      <div className='mt-3 flex justify-between items-center text-gray-500 dark:text-white'>
        <div className='flex gap-3 items-center'>
          <div className='flex gap-1 items-center'>
            {liked ? <LikedFilled className='w-4 h-4 md:w-5 md:h-5 text-secondaryRed'/> : <LikedOutlined className='w-4 h-4 md:w-5 md:h-5'/>}
            <h2 className='text-sm'>{likes}</h2>
          </div>
          <div className='flex gap-1 items-center'>
            <CommentsOutlined className='w-4 h-4 md:w-5 md:h-5'/>
            <h2 className='text-sm'>{commentLength}</h2>
          </div>
          <div className='flex gap-1 items-center'>
            {saved ? <BookMarkFilled className='w-4 h-4 md:w-5 md:h-5 text-tertiaryBlue'/>: <BookMarkOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
            <h2 className='text-sm'>{saves}</h2>
          </div>
        </div>
        <ShareForwardOutlined className='w-4 h-4 md:w-5 md:h-5 cursor-pointer' onClick={() => console.log('I shared this post')}/>
      </div>
    )
  }

  React.useEffect(() => {
  if (editPost) {
    setHideCreatePost(true)
  } else {
    setHideCreatePost(false)
  }
  }, [editPost, setHideCreatePost])

  const MainPostSection = ({postTime, postAuthor, post, postImage, hashtag, postAuthorImage, postAuthorId, currentCity, currentState}:Partial<singlePostProps>):React.ReactElement => {
    return (
      <div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-2 items-center'>
            <div className='w-fit'>
              <ImageAvatar size='extraSmall' profilePicture={postAuthorImage}/>
            </div>
            <div>
              <div className='flex gap-3 items-baseline mb-[3px] '>
                <h2 className='font-medium capitalize lg:text-[14.5px] text-[13px] leading-[1.1]'>{postAuthor}.</h2>
                <h2 className='lg:text-[13px] text-[12px] leading-[1.1]'>{currentCity}, {currentState}.</h2>
              </div>
              <h3 className='text-gray-400 text-xs'>{postTime}</h3>
            </div>
          </div>
          <div className='relative'>
            <Ellipsis className='w-6 h-6 cursor-pointer' onClick={() => setShowMenu(!showMenu)}/>
            { showMenu && <Menu postAuthorId={postAuthorId}/> }
          </div>
        </div>
        <div className='pt-3 flex flex-col gap-2'>
          <p className='text-sm lg:text-[14.5px] leading-[1.1]'>{post}</p>
          {postImage &&  
          <div className='w-full lg:h-[350px] h-[280px] rounded overflow-hidden relative'>
            <div className='absolute left-0 top-0 w-full h-full bg-black/20 z-[1000]'/>
            <Image src={postImage as string} fill className='w-full h-full object-cover' alt='test_image'/>
          </div> }
          <h3 className='text-tertiaryBlue text-sm text-right'>{createHashTag(hashtag as string)}</h3>
        </div>
      </div>
    )
  }
  
  return (
    <>
    {editPost ? <EditPost onClick={()=>setEditPost(false)} data={testPost[0]}/> :
    <CardComponent>
      <div className='p-1'>
        <MainPostSection postTime={postTime} postAuthor={postAuthor} post={post} postImage={postImage} hashtag={hashtag} postAuthorImage={postAuthorImage} postAuthorId={postAuthorId} currentCity={currentCity} currentState={currentState}/>
        <PostControls likes={likes} saves={saves} commentLength={commentLength}/>
        <CommentSection comments={comments}/>
      </div>
    </CardComponent>
    }
    </>
  )
}

export default SinglePost
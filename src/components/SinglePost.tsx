'use client'

import React from 'react'
import CardComponent from './CardComponent'
import ImageAvatar from './ImageAvatar'
import { AddUserOutlined, BookMarkFilled, BookMarkOutlined, CloseIconCircle, CommentsOutlined, Delete, EditOutlined, Ellipsis, LikedFilled, LikedOutlined, RepeatOutlined, SavedOutlined, SendOutlined, ShareForwardOutlined, UnfollowUserOutlined, UserOutlinedAlt } from './IconPacks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useInput from '@/hooks/useInput';
import { useSession } from 'next-auth/react'
import EditPost from './EditPost'
import { createHashTag } from '@/hooks/formatHasTag'
import { singlePostProps } from '@/types/types'
import { useNotifications } from '@/hooks/useNotifications'
import { Alert } from './Notifications'
import { timeFormatter } from '@/hooks/timeFormatter'
import { FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'

type menuItemProps = {
  children: React.ReactNode
  onClick: () => void
}

const FeedSinglePost = ({isRepost, originalAuthor, originalAuthorProfilePicture, originalPostTime, reposts, _id, postStatus, postMessage, postAuthor, postAuthorId, postAuthorProfilePicture, postImage, updatedAt, savedPosts, hashTag, comments, likes, postLocation, setHideCreatePost}: singlePostProps) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [editPost, setEditPost] = React.useState(false);
  const [showCommentSection, setShowCommentSection] = React.useState(false);
  const [postReady, setPostReady] = React.useState(false);
  const [followReady, setFollowReady] = React.useState(false);
  const [isLoading, setIsLoading] =  React.useState(false);

  const {data: session, update}:any = useSession();
  const userLoggedIn = postAuthorId === session.user._id;
  const alreadyFollowing = session?.user.followings && session?.user.followings.includes(postAuthorId)
  
  const {displayAlert, setAlertType, setDisplayAlert, setAlertMessage, alertMessage, alertType } = useNotifications();

  React.useEffect(() => {
    if (editPost) {
      setHideCreatePost(true)
    } else {
      setHideCreatePost(false)
    }
  }, [editPost, setHideCreatePost])

  const handleFollowUser = async () => {
    try {
      const response = await fetch(`/api/addFollower/${session?.user._id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({followId: postAuthorId})
      }).then((response) => response.json());
      setFollowReady(true)
      setDisplayAlert(true)
      setAlertMessage(response?.message)
      setAlertType('success')
    } catch (error) {
      setFollowReady(false)
      setDisplayAlert(true)
      setAlertMessage('Something went wrong, try again later')
      setAlertType('error')
    }
  }

  const updateCurrentSession = async () => {
    const response = await fetch(`/api/getSingleUser/${session?.user._id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      cache: 'no-store'
    })
    const data = await response.json();
    update({...session,
      user: {
        ...session.user,
        username: data?.username, 
        surname: data?.surname,
        lastname: data?.lastname,
        email: data?.email,
        profileImage: data?.profileImage,
        coverImage: data?.coverImage,
        gender: data?.gender,
        status: data?.status,
        address: data?.address,
        hobbies: data?.hobbies,
        otherSocialProfiles: data?.otherSocialProfiles, 
        profileCreated: data?.profileCreated,
        savedPosts: data?.savedPosts,
        reTweets: data?.reTweets,
        occupation: data?.occupation,
        birthday: data?.birthday,
        birthdate: data?.birthdate,
        age: data?.age,
        city: data?.city,
        followers: data?.followers,
        followings: data?.followings,
        state: data?.state,
        mobileNumber: data?.mobileNumber,
        bio: data?.bio,
        createdPosts: data?.createdPosts,
        interests: data?.interests
      }
    })
  }

  const Menu = ({postAuthorId}:Partial<singlePostProps>):React.ReactElement => {
    const router = useRouter();

    React.useEffect(() => {
      if (postReady) {
        updateCurrentSession();
      } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postReady]);

    const handleDeletePost = async () => {
      try {
        await fetch(`/api/deletePost/${_id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          if (response.status === 200) {
            setFollowReady(true)
            setDisplayAlert(true);
            setAlertType('success')
            setAlertMessage('Post deleted successfully')
          }
        })
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const MenuItem = ({children, onClick}:menuItemProps)=> {
      return (
        <button className='lg:text-[14.5px] text-sm hover:text-white active:text-white w-full bg-inherit flex gap-2 items-center hover:bg-tertiaryBlue rounded py-[3px] pl-[3px] r-[6px] active:bg-tertiaryBlue' onClick={onClick}>
          {children}
        </button>
      )
    }
    return (
      <div className='flex-col min-w-[180px] lg:min-w-[200px] absolute top-0 right-0 flex gap-1 z-[2000] border bg-white dark:bg-[#3d3d3d] p-1 rounded shadow'>
        { postAuthorId === session?.user._id && 
        <>
          { !isRepost &&
            <MenuItem onClick={() => {setShowMenu(false), setEditPost(true)}}>
              <EditOutlined className='w-4 h-4 md:w-5 md:h-5'/>
              <h2>Edit</h2>
            </MenuItem>
          }
          <MenuItem onClick={() => {handleDeletePost(), setPostReady(true), setShowMenu(false)}}>
            <Delete className='w-4 h-4 md:w-5 md:h-5'/>
            <h2>Delete</h2>
          </MenuItem>
        </>
        }
        <MenuItem onClick={() => {setShowMenu(false), handleFollowUser()}}>
          { alreadyFollowing ? <UnfollowUserOutlined className='w-4 h-4 md:w-5 md:h-5'/> : <AddUserOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
          { alreadyFollowing ? <h2>Unfollow Author</h2>: <h2>Follow Author</h2> }
        </MenuItem>
        <MenuItem onClick={() => {setShowMenu(false), router.push(`/profile/${postAuthorId}`)}}>
          <UserOutlinedAlt className='w-4 h-4 md:w-5 md:h-5'/>
          <h2>Checkout Author</h2>
        </MenuItem>
      </div>
    )
  }

  const CommentSection = ({comments}:Partial<singlePostProps>):React.ReactElement => {
    const CreateComment = () => {
      const comment = useInput('');
      const newTime = new Date().toISOString();
      const commentData = {profileImage: session.user.profileImage.url, comment: comment.value, commentAuthor: session.user.surname + ' ' + session.user.lastname, commentTime: newTime}

      const handleCreateComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        try {
          const response = await fetch(`/api/createComments/${_id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentData)
          }).then((response) => response.json());
          setDisplayAlert(true)
          setAlertMessage(response?.message)
          setAlertType('success')
        } catch (error) {
          setDisplayAlert(true)
          setAlertMessage('Something went wrong, try again later')
          setAlertType('error')
        }
        setIsLoading(false)
      }
      return (
        <form onSubmit={handleCreateComment}>
          <div className='lg:h-[55px] h-[45px] relative' onSubmit={() => console.log(comment.value)}>
            <div className='absolute -left-1 -top-1'>
              <ImageAvatar size='extraSmall' profilePicture={session.user.profileImage.url}/>
            </div>
            <textarea name="" id="postMessage" className='border resize-none rounded h-full w-full lg:pl-[45px] lg:pr-8 pr-7 pl-[40px] p-2 outline-none focus:outline-none text-[13px] leading-[1.1] bg-inherit dark:placeholder:text-white' placeholder='say something...' value={comment.value} onChange={comment.onTextAreaChange}/>
            <button type='submit' className='absolute top-5 lg:top-7 right-3 z-[300]'>
              {isLoading ? <h2 className='text-sm text-primaryGreen'>...posting</h2> : <SendOutlined className='w-5 h-5 text-primaryGreen'/>}
            </button>
          </div>
        </form>
      )
    }
    return (
      <div className='mt-4'>
        <div className='mb-3'>
          <button className='mb-3 text-sm'>Comments</button>
          <div className='flex gap-3 flex-col'>
            {comments && comments.length > 0 && comments.map((e:any, index:number) => (
              <div className='text-gray-500 dark:text-white lg:min-h-[35px] min-h-[30px] relative pt-[18px] border-b last:border-b-0' key={index}>
                <div className='absolute -left-1 -top-1 flex gap-2'>
                  <ImageAvatar size='extraSmall' profilePicture={e.profileImage}/>
                  <div>
                    <h2 className='text-sm capitalize'>{e.commentAuthor}</h2>
                    <h2 className='text-xs'>{timeFormatter(e.commentTime)}</h2>
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

  const PostControls = ({reposts, likes, savedPosts, comments}:Partial<singlePostProps>):React.ReactElement => {

    const userAlreadyLiked = likes?.includes(session?.user._id);
    const userAlreadyRetweeted = reposts?.includes(session?.user._id);
    const userAlreadySaved = savedPosts?.includes(session?.user._id);

    const [showElement, setShowElement] = React.useState(false);

    const repostData = {
      originalPostId: _id,
      postAuthor: session.user.surname + ' ' + session.user.lastname,
      originalAuthor: postAuthor,
      postAuthorId: session.user._id,
      postImage: postImage,
      originalAuthorId: postAuthorId,
      postLocation: postLocation,
      postAuthorProfilePicture: session.user.profileImage.url,
      originalAuthorProfilePicture: postAuthorProfilePicture,
      isRepost: true,
      postMessage: postMessage,
      hashTag: hashTag,
      postStatus: postStatus,
      originalPostTime: updatedAt,
    }

    const handleLikePost = async () => {
      try {
        const response = await fetch(`/api/likePost/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user._id}),
        }).then((response) => response.json());
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const handleSavePost = async () => {
      try {
        const response = await fetch(`/api/savePost/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user._id}),
        }).then((response) => response.json());
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const handleCreateRepost = async () => {
      try {
        const response = await fetch('/api/createRepost', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(repostData)
        }).then((response) => response.json());
        setFollowReady(true)
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const ShareElement = () => {
      const url = 'nomeogram.com';
      const hastag = hashTag;
      return (
        <div className='w-full border rounded lg:px-12 lg:py-3 px-5 py-3 relative'>
          <CloseIconCircle className='w-6 h-6 absolute right-2 top-2 text-secondaryRed cursor-pointer' onClick={() => setShowElement(false)}/>
          <div className='flex items-center justify-between lg:mb-6 mb-4'>
            <h2 className='lg:text-base text-sm ml-4'>Share this post on</h2>
          </div>
          <div className='flex items-center lg:gap-4 gap-3'>
            <FacebookShareButton url={url} hashtag={hashTag}>
              <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round={true}/>
            </LinkedinShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
        { showElement ? <ShareElement/> :
          <div className='mt-3 flex justify-between items-center text-gray-500 dark:text-white'>
            <div className='flex gap-3 items-center'>
              <button className='flex gap-1 items-center' onClick={handleLikePost}>
                { userAlreadyLiked ? <LikedFilled className='w-4 h-4 md:w-5 md:h-5 text-secondaryRed'/> : <LikedOutlined className='w-4 h-4 md:w-5 md:h-5'/>}
                <h2 className='text-sm'>{likes && likes.length > 0 ? likes.length : ''}</h2>
              </button>
              <button className='flex gap-1 items-center' onClick={() => setShowCommentSection(!showCommentSection)}>
                <CommentsOutlined className='w-4 h-4 md:w-5 md:h-5'/>
                <h2 className='text-sm'>{ comments && comments.length > 0 ? comments.length : '' }</h2>
              </button>
              <button className='flex gap-1 items-center' onClick={handleSavePost}>
                { userAlreadySaved ? <BookMarkFilled className='w-4 h-4 md:w-5 md:h-5 text-tertiaryBlue'/>: <BookMarkOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
                <h2 className='text-sm'>{savedPosts && savedPosts.length > 0 ? savedPosts.length : ''}</h2>
              </button>
              {!isRepost && 
                <button className='flex gap-1 items-center' onClick={handleCreateRepost}>
                  { userAlreadyRetweeted ? <RepeatOutlined className='w-4 h-4 md:w-5 md:h-5 text-tertiaryBlue'/> : <RepeatOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
                  <h2 className='text-sm'>{reposts && reposts.length > 0 ? reposts.length : '' }</h2>
                </button>
              }
            </div>
            <ShareForwardOutlined className='w-4 h-4 md:w-5 md:h-5 cursor-pointer' onClick={() => setShowElement(true)}/>
          </div>
        }
      </React.Fragment>
    )
  }

  const MainPostSection = ({updatedAt, postAuthor, postMessage, postImage, hashTag, postAuthorProfilePicture, postAuthorId, postLocation}:Partial<singlePostProps>):React.ReactElement => {
    return (
      <div>
        { isRepost && 
          <div className='flex items-center justify-between w-full mb-2'>
            <div className='flex gap-2 items-center'>
              <div className='w-fit'>
                <ImageAvatar size='extremelySmall' profilePicture={postAuthorProfilePicture}/>
              </div>
              <div>
                <div>
                  <div className='flex gap-2 items-baseline mb-[3px] '>
                    <h2 className='font-medium capitalize text-sm leading-[1.0]'>{userLoggedIn ? 'you' : postAuthor}.</h2>
                    <h2 className='text-sm leading-[1.0]'>reposted this</h2>
                  </div>
                  <h3 className='text-gray-400 text-sm dark:text-white leading-[1.0]'>{timeFormatter(updatedAt as Date)}</h3>
                </div>
              </div>
            </div>
            <div className='relative'>
              <Ellipsis className='w-6 h-6 cursor-pointer rotate-90 -mt-7' onClick={() => setShowMenu(!showMenu)}/>
              { showMenu && <Menu postAuthorId={postAuthorId}/> }
            </div>
          </div>
        }
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-2 items-center'>
            <div className='w-fit'>
              <ImageAvatar size='extraSmall' profilePicture={isRepost ? originalAuthorProfilePicture : postAuthorProfilePicture}/>
            </div>
            <div>
              <div>
                <div className='flex gap-3 items-baseline mb-[3px] '>
                  <h2 className='font-medium capitalize lg:text-[14.5px] text-[13px] leading-[1.1]'>{isRepost ? originalAuthor : postAuthor}.</h2>
                  <h2 className='lg:text-[14.5px] text-[13px] leading-[1.1] capitalize'>{postLocation}.</h2>
                </div>
                <h3 className='text-gray-400 text-sm dark:text-white leading-[1.0]'>{timeFormatter(isRepost ? originalPostTime : updatedAt as Date)}</h3>
              </div>
            </div>
          </div>
          {!isRepost &&
            <div className='relative'>
              <Ellipsis className='w-6 h-6 cursor-pointer rotate-90 -mt-7' onClick={() => setShowMenu(!showMenu)}/>
              { showMenu && <Menu postAuthorId={postAuthorId}/> }
            </div>
          }
        </div>
        <div className='pt-3 flex flex-col gap-2'>
          <p className='text-sm lg:text-[14.5px] leading-[1.1]'>{postMessage}</p>
          { postImage?.url &&  
          <div className='w-full lg:h-[250px] h-[220px] rounded overflow-hidden relative'>
            <div className='absolute left-0 top-0 w-full h-full bg-black/20 z-[1000]'/>
            <Image src={postImage.url} fill className='w-full h-full object-cover' alt='test_image'/>
          </div> }
          { hashTag && <h3 className='text-tertiaryBlue text-sm text-right'>{createHashTag(hashTag as string)}</h3> }
        </div>
      </div>
    )
  }
  
  return (
    <React.Fragment>
    { editPost ? 
      <EditPost 
        onClick={()=>setEditPost(false)}
        _id={_id} 
        postMessage={postMessage}
        postImage={postImage} 
        hashTag={hashTag}
        postLocation={postLocation}
        postStatus={postStatus}
      /> :
      <React.Fragment>
        <Alert 
          type={alertType} 
          message={alertMessage} 
          displayAlert={displayAlert} 
          onClick={ followReady ?  () => { updateCurrentSession(), setDisplayAlert(false)} : () => {window.location.reload(), setDisplayAlert(false)}} 
        />
        <CardComponent overflow>
          <div className='p-1 relative'>
            <MainPostSection updatedAt={updatedAt} postAuthor={postAuthor} postMessage={postMessage} postImage={postImage} hashTag={hashTag} postAuthorProfilePicture={postAuthorProfilePicture} postAuthorId={postAuthorId} postLocation={postLocation}/>
            <PostControls likes={likes} savedPosts={savedPosts} comments={comments} reposts={reposts}/>
            {showCommentSection && <CommentSection comments={comments}/>}
          </div>
        </CardComponent>
      </React.Fragment>
    }
    </React.Fragment>
  )
}

const PlainSinglePost = ({isRepost, originalAuthor, originalAuthorId, originalAuthorProfilePicture, originalPostTime, reposts, _id, postStatus, postMessage, postAuthor, postAuthorId, postAuthorProfilePicture, postImage, updatedAt, savedPosts, hashTag, comments, likes, postLocation}: Partial<singlePostProps>) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [editPost, setEditPost] = React.useState(false);
  const [showCommentSection, setShowCommentSection] = React.useState(false);
  const [postReady, setPostReady] = React.useState(false);
  const [followReady, setFollowReady] = React.useState(false);
  const [isLoading, setIsLoading] =  React.useState(false);

  const {data: session, update}:any = useSession();
  const userLoggedIn = postAuthorId === session.user._id;
  const alreadyFollowing = session?.user.followings && session?.user.followings.includes(postAuthorId)
  
  const {displayAlert, setAlertType, setDisplayAlert, setAlertMessage, alertMessage, alertType } = useNotifications();

  const handleFollowUser = async () => {
    try {
      const response = await fetch(`/api/addFollower/${session?.user._id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({followId: postAuthorId})
      }).then((response) => response.json());
      setFollowReady(true)
      setDisplayAlert(true)
      setAlertMessage(response?.message)
      setAlertType('success')
    } catch (error) {
      setFollowReady(false)
      setDisplayAlert(true)
      setAlertMessage('Something went wrong, try again later')
      setAlertType('error')
    }
  }

  const updateCurrentSession = async () => {
    const response = await fetch(`/api/getSingleUser/${session?.user._id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      cache: 'no-store'
    })
    const data = await response.json();
    update({...session,
      user: {
        ...session.user,
        username: data?.username, 
        surname: data?.surname,
        lastname: data?.lastname,
        email: data?.email,
        profileImage: data?.profileImage,
        coverImage: data?.coverImage,
        gender: data?.gender,
        status: data?.status,
        address: data?.address,
        hobbies: data?.hobbies,
        otherSocialProfiles: data?.otherSocialProfiles, 
        profileCreated: data?.profileCreated,
        savedPosts: data?.savedPosts,
        reTweets: data?.reTweets,
        occupation: data?.occupation,
        birthday: data?.birthday,
        birthdate: data?.birthdate,
        age: data?.age,
        city: data?.city,
        followers: data?.followers,
        followings: data?.followings,
        state: data?.state,
        mobileNumber: data?.mobileNumber,
        bio: data?.bio,
        createdPosts: data?.createdPosts,
        interests: data?.interests
      }
    })
  }

  const Menu = ({postAuthorId}:Partial<singlePostProps>):React.ReactElement => {
    const router = useRouter();

    React.useEffect(() => {
      if (postReady) {
        updateCurrentSession();
      } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postReady]);

    const handleDeletePost = async () => {
      try {
        await fetch(`/api/deletePost/${_id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          if (response.status === 200) {
            setFollowReady(true)
            setDisplayAlert(true);
            setAlertType('success')
            setAlertMessage('Post deleted successfully')
          }
        })
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const MenuItem = ({children, onClick}:menuItemProps)=> {
      return (
        <button className='lg:text-[14.5px] text-sm hover:text-white active:text-white w-full bg-inherit flex gap-2 items-center hover:bg-tertiaryBlue rounded py-[3px] pl-[3px] r-[6px] active:bg-tertiaryBlue' onClick={onClick}>
          {children}
        </button>
      )
    }
    return (
      <div className='flex-col min-w-[180px] lg:min-w-[200px] absolute top-0 right-0 flex gap-1 z-[2000] border bg-white dark:bg-[#3d3d3d] p-1 rounded shadow'>
        { postAuthorId === session?.user._id && 
        <>
          { !isRepost &&
            <MenuItem onClick={() => {setShowMenu(false), setEditPost(true)}}>
              <EditOutlined className='w-4 h-4 md:w-5 md:h-5'/>
              <h2>Edit</h2>
            </MenuItem>
          }
          <MenuItem onClick={() => {handleDeletePost(), setPostReady(true), setShowMenu(false)}}>
            <Delete className='w-4 h-4 md:w-5 md:h-5'/>
            <h2>Delete</h2>
          </MenuItem>
        </>
        }
        <MenuItem onClick={() => {setShowMenu(false), handleFollowUser()}}>
          { alreadyFollowing ? <UnfollowUserOutlined className='w-4 h-4 md:w-5 md:h-5'/> : <AddUserOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
          { alreadyFollowing ? <h2>Unfollow Author</h2>: <h2>Follow Author</h2> }
        </MenuItem>
        <MenuItem onClick={() => {setShowMenu(false), router.push(`/profile/${postAuthorId}`)}}>
          <UserOutlinedAlt className='w-4 h-4 md:w-5 md:h-5'/>
          <h2>Checkout Author</h2>
        </MenuItem>
      </div>
    )
  }

  const CommentSection = ({comments}:Partial<singlePostProps>):React.ReactElement => {
    const CreateComment = () => {
      const comment = useInput('');
      const newTime = new Date().toISOString();
      const commentData = {profileImage: session.user.profileImage.url, comment: comment.value, commentAuthor: session.user.surname + ' ' + session.user.lastname, commentTime: newTime}

      const handleCreateComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        try {
          const response = await fetch(`/api/createComments/${_id}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentData)
          }).then((response) => response.json());
          setDisplayAlert(true)
          setAlertMessage(response?.message)
          setAlertType('success')
        } catch (error) {
          setDisplayAlert(true)
          setAlertMessage('Something went wrong, try again later')
          setAlertType('error')
        }
        setIsLoading(false)
      }
      return (
        <form onSubmit={handleCreateComment}>
          <div className='lg:h-[55px] h-[45px] relative' onSubmit={() => console.log(comment.value)}>
            <div className='absolute -left-1 -top-1'>
              <ImageAvatar size='extraSmall' profilePicture={session.user.profileImage.url}/>
            </div>
            <textarea name="" id="postMessage" className='border resize-none rounded h-full w-full lg:pl-[45px] lg:pr-8 pr-7 pl-[40px] p-2 outline-none focus:outline-none text-[13px] leading-[1.1] bg-inherit dark:placeholder:text-white' placeholder='say something...' value={comment.value} onChange={comment.onTextAreaChange}/>
            <button type='submit' className='absolute top-5 lg:top-7 right-3 z-[300]'>
              {isLoading ? <h2 className='text-sm text-primaryGreen'>...posting</h2> : <SendOutlined className='w-5 h-5 text-primaryGreen'/>}
            </button>
          </div>
        </form>
      )
    }
    return (
      <div className='mt-4'>
        <div className='mb-3'>
          <button className='mb-3 text-sm'>Comments</button>
          <div className='flex gap-3 flex-col'>
            {comments && comments.length > 0 && comments.map((e:any, index:number) => (
              <div className='text-gray-500 dark:text-white lg:min-h-[35px] min-h-[30px] relative pt-[18px] border-b last:border-b-0' key={index}>
                <div className='absolute -left-1 -top-1 flex gap-2'>
                  <ImageAvatar size='extraSmall' profilePicture={e.profileImage}/>
                  <div>
                    <h2 className='text-sm capitalize'>{e.commentAuthor}</h2>
                    <h2 className='text-xs'>{timeFormatter(e.commentTime)}</h2>
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

  const PostControls = ({reposts, likes, savedPosts, comments}:Partial<singlePostProps>):React.ReactElement => {

    const userAlreadyLiked = likes?.includes(session?.user._id);
    const userAlreadyRetweeted = reposts?.includes(session?.user._id);
    const userAlreadySaved = savedPosts?.includes(session?.user._id);

    const [showElement, setShowElement] = React.useState(false);

    const repostData = {
      originalPostId: _id,
      postAuthor: session.user.surname + ' ' + session.user.lastname,
      originalAuthor: postAuthor,
      postAuthorId: session.user._id,
      postImage: postImage,
      originalAuthorId: postAuthorId,
      postLocation: postLocation,
      postAuthorProfilePicture: session.user.profileImage.url,
      originalAuthorProfilePicture: postAuthorProfilePicture,
      isRepost: true,
      postMessage: postMessage,
      hashTag: hashTag,
      postStatus: postStatus,
      originalPostTime: updatedAt,
    }

    const handleLikePost = async () => {
      try {
        const response = await fetch(`/api/likePost/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user._id}),
        }).then((response) => response.json());
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const handleSavePost = async () => {
      try {
        const response = await fetch(`/api/savePost/${_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: session?.user._id}),
        }).then((response) => response.json());
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const handleCreateRepost = async () => {
      try {
        const response = await fetch('/api/createRepost', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(repostData)
        }).then((response) => response.json());
        setFollowReady(true)
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage(response?.message)
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    }

    const ShareElement = () => {
      const url = 'nomeogram.com';
      const hastag = hashTag;
      return (
        <div className='w-full border rounded lg:px-12 lg:py-3 px-5 py-3 relative'>
          <CloseIconCircle className='w-6 h-6 absolute right-2 top-2 text-secondaryRed cursor-pointer' onClick={() => setShowElement(false)}/>
          <div className='flex items-center justify-between lg:mb-6 mb-4'>
            <h2 className='lg:text-base text-sm ml-4'>Share this post on</h2>
          </div>
          <div className='flex items-center lg:gap-4 gap-3'>
            <FacebookShareButton url={url} hashtag={hashTag}>
              <FacebookIcon size={32} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round={true}/>
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round={true}/>
            </LinkedinShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon size={32} round={true}/>
            </WhatsappShareButton>
          </div>
        </div>
      )
    }

    return (
      <React.Fragment>
      { showElement ? <ShareElement/> :
      <div className='mt-3 flex justify-between items-center text-gray-500 dark:text-white'>
        <div className='flex gap-3 items-center'>
          <button className='flex gap-1 items-center' onClick={handleLikePost}>
            { userAlreadyLiked ? <LikedFilled className='w-4 h-4 md:w-5 md:h-5 text-secondaryRed'/> : <LikedOutlined className='w-4 h-4 md:w-5 md:h-5'/>}
            <h2 className='text-sm'>{likes && likes.length > 0 ? likes.length : ''}</h2>
          </button>
          <button className='flex gap-1 items-center' onClick={() => setShowCommentSection(!showCommentSection)}>
            <CommentsOutlined className='w-4 h-4 md:w-5 md:h-5'/>
            <h2 className='text-sm'>{ comments && comments.length > 0 ? comments.length : '' }</h2>
          </button>
          <button className='flex gap-1 items-center' onClick={handleSavePost}>
            { userAlreadySaved ? <BookMarkFilled className='w-4 h-4 md:w-5 md:h-5 text-tertiaryBlue'/>: <BookMarkOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
            <h2 className='text-sm'>{savedPosts && savedPosts.length > 0 ? savedPosts.length : ''}</h2>
          </button>
          {!isRepost && 
            <button className='flex gap-1 items-center' onClick={handleCreateRepost}>
              { userAlreadyRetweeted ? <RepeatOutlined className='w-4 h-4 md:w-5 md:h-5 text-tertiaryBlue'/> : <RepeatOutlined className='w-4 h-4 md:w-5 md:h-5'/> }
              <h2 className='text-sm'>{reposts && reposts.length > 0 ? reposts.length : '' }</h2>
            </button>
          }
        </div>
        <ShareForwardOutlined className='w-4 h-4 md:w-5 md:h-5 cursor-pointer' onClick={() => setShowElement(true)}/>
      </div> }
      </React.Fragment>
    )
  }

  const MainPostSection = ({updatedAt, postAuthor, postMessage, postImage, hashTag, postAuthorProfilePicture, postAuthorId, postLocation}:Partial<singlePostProps>):React.ReactElement => {
    return (
      <div>
        { isRepost && 
          <div className='flex items-center justify-between w-full mb-2'>
            <div className='flex gap-2 items-center'>
              <div className='w-fit'>
                <ImageAvatar size='extremelySmall' profilePicture={postAuthorProfilePicture}/>
              </div>
              <div>
                <div>
                  <div className='flex gap-2 items-baseline mb-[3px] '>
                    <h2 className='font-medium capitalize text-sm leading-[1.0]'>{userLoggedIn ? 'you' : postAuthor}.</h2>
                    <h2 className='text-sm leading-[1.0]'>reposted this</h2>
                  </div>
                  <h3 className='text-gray-400 text-sm dark:text-white leading-[1.0]'>{timeFormatter(updatedAt as Date)}</h3>
                </div>
              </div>
            </div>
            <div className='relative'>
              <Ellipsis className='w-6 h-6 cursor-pointer rotate-90 -mt-7' onClick={() => setShowMenu(!showMenu)}/>
              { showMenu && <Menu postAuthorId={postAuthorId}/> }
            </div>
          </div>
        }
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-2 items-center'>
            <div className='w-fit'>
              <ImageAvatar size='extraSmall' profilePicture={isRepost ? originalAuthorProfilePicture : postAuthorProfilePicture}/>
            </div>
            <div>
              <div>
                <div className='flex gap-3 items-baseline mb-[3px] '>
                  <h2 className='font-medium capitalize lg:text-[14.5px] text-[13px] leading-[1.1]'>{isRepost ? originalAuthor : postAuthor}.</h2>
                  <h2 className='lg:text-[14.5px] text-[13px] leading-[1.1] capitalize'>{postLocation}.</h2>
                </div>
                <h3 className='text-gray-400 text-sm dark:text-white leading-[1.0]'>{timeFormatter(isRepost ? originalPostTime as Date : updatedAt as Date)}</h3>
              </div>
            </div>
          </div>
          {!isRepost &&
            <div className='relative'>
              <Ellipsis className='w-6 h-6 cursor-pointer rotate-90 -mt-7' onClick={() => setShowMenu(!showMenu)}/>
              { showMenu && <Menu postAuthorId={postAuthorId}/> }
            </div>
          }
        </div>
        <div className='pt-3 flex flex-col gap-2'>
          <p className='text-sm lg:text-[14.5px] leading-[1.1]'>{postMessage}</p>
          { postImage?.url &&  
          <div className='w-full lg:h-[250px] h-[220px] rounded overflow-hidden relative'>
            <div className='absolute left-0 top-0 w-full h-full bg-black/20 z-[1000]'/>
            <Image src={postImage.url} fill className='w-full h-full object-cover' alt='test_image'/>
          </div> }
          { hashTag && <h3 className='text-tertiaryBlue text-sm text-right'>{createHashTag(hashTag as string)}</h3> }
        </div>
      </div>
    )
  }
  
  return (
    <React.Fragment>
      <React.Fragment>
        <Alert 
          type={alertType} 
          message={alertMessage} 
          displayAlert={displayAlert} 
          onClick={ followReady ?  () => { updateCurrentSession(), setDisplayAlert(false)} : () => {window.location.reload(), setDisplayAlert(false)}} 
        />
        <CardComponent overflow>
          <div className='p-1'>
            <MainPostSection updatedAt={updatedAt} postAuthor={postAuthor} postMessage={postMessage} postImage={postImage} hashTag={hashTag} postAuthorProfilePicture={postAuthorProfilePicture} postAuthorId={postAuthorId} postLocation={postLocation}/>
            <PostControls likes={likes} savedPosts={savedPosts} comments={comments} reposts={reposts}/>
            {showCommentSection && <CommentSection comments={comments}/>}
          </div>
        </CardComponent>
      </React.Fragment>
    </React.Fragment>
  )
}

export { FeedSinglePost, PlainSinglePost }
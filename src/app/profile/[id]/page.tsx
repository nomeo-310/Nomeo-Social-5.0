/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React from 'react'
import withAuth from '@/utils/withAuth';
import Feeds from '@/components/Feeds';
import ProfileLayout from '@/components/ProfileLayout';
import CardComponent from '@/components/CardComponent';
import UserList from '@/components/UserList';
import { useParams } from 'next/navigation';
import { AboutSection, PhotosSection, SavedPostsSection } from './components/PageComponents';
import { useSession } from 'next-auth/react';
import { BookMarkOutlined, Contacts, FollowedUserOutlined, Gallery, GroupUserOutlined, InfoFilled, RSSFeeds, ShareNodeOutlined } from '@/components/IconPacks';
import FriendList from '@/components/FriendList';

const Profile = () => {
  const {data: session, update}:any = useSession();

  const params = useParams();
  const {id}:any = params;

  const [currentUser, setCurrentUser] = React.useState<any>({});
  const [currentUserPosts, setCurrentUserPosts] = React.useState<any[]>([]);
  const [currentUserSavedPosts, setCurrentUserSavedPosts] = React.useState<any[]>([]);
  const [currentUserFollowers, setCurrentUserFollowers] = React.useState<any[]>([]);
  const [currentUserFollowings, setCurrentUserFollowings] = React.useState<any[]>([]);
  const [currentUserPostImages, setCurrentUserPostImages] = React.useState<[{public_id: string, url: string}]>([{public_id: '', url: ''}]);
  const [userReady, setUserReady] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const noProfile = currentUser.profileCreated === false;

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

  const getCurrentUserFollowers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getFollowers/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUserFollowers(data);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const getCurrentUserFollowings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getFollowings/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUserFollowings(data);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const getCurrentUser = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getSingleUser/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  
  const getAllCurrentUserPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getAllUserPosts/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUserPosts(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const getAllCurrentUserPostImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getAllUserPostImages/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUserPostImages(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const getCurrentUserSavedPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/getSavedPosts/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data = await response.json();
      setCurrentUserSavedPosts(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (id) {
      getCurrentUser();
    }
    }, [id])

  React.useEffect(() => {
    if (id) {
      getAllCurrentUserPosts();
    }
    }, [id])

  React.useEffect(() => {
    if (id) {
      getAllCurrentUserPostImages();
    }
    }, [id])

  React.useEffect(() => {
    if (id) {
      getCurrentUserSavedPosts();
    }
    }, [id])

  React.useEffect(() => {
    if (id) {
      getCurrentUserFollowers();
    }
    }, [id])

  React.useEffect(() => {
    if (id) {
      getCurrentUserFollowings();
    }
    }, [id])

  React.useEffect(() => {
    if (userReady) {
      updateCurrentSession();
    }
    }, [userReady])

  const [activeTab, setActiveTab] = React.useState('about');

  const ProfileNavigation = () => {
    const tabList = [
      {name:'about', inactiveicon: <InfoFilled className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <InfoFilled className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
      {name:'feeds', inactiveicon: <RSSFeeds className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <RSSFeeds className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
      {name:'photos', inactiveicon: <Gallery className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <Gallery className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
      {name:'followers', inactiveicon: <GroupUserOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <GroupUserOutlined className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
      {name:'followings', inactiveicon: <FollowedUserOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <FollowedUserOutlined className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
      {name:'saved posts', inactiveicon: <BookMarkOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <BookMarkOutlined className='lg:w-7 w-6 lg:h-7 h-6'/>}, 
    ];
    const active = 'lg:-mx-4 -mx-4 bg-tertiaryBlue text-white px-3 lg:text-lg text-base py-[5px]';
    const inactive = 'lg:text-base text-sm py-[3px] text-gray-500 dark:text-white'

    return (
      <div className='w-full'>
        <div className='flex flex-col gap-[3px] lg:pt-4 pt-3'>
          { tabList.map((item:any, index:number) => (
            <span key={`item_${index}`} onClick={()=>setActiveTab(item.name)} className={`cursor-pointer capitalize rounded flex items-center justify-between ${ activeTab === item.name ? active : inactive }`}>
              {item.name}
              {activeTab === item.name ? item.activeicon : item.inactiveicon}
            </span>
            ))
          }
        </div>
        <span className={`lg:hidden cursor-pointer capitalize rounded flex items-center justify-between ${ activeTab === 'userlist' ? active : inactive }`} onClick={()=>setActiveTab('userlist')}>
          Userlist
          { activeTab === 'userlist' ? <Contacts className='lg:w-6 lg:h-6 w-5 h-5'/> : <Contacts className='lg:w-7 w-6 lg:h-7 h-6'/> }
        </span>
      </div>
    )
  }

  const MainPageProfileNav = () => {
    return (
      <React.Fragment>
        {currentUser?._id === session?.user._id && 
          <CardComponent overflow>
            <ProfileNavigation/>
          </CardComponent>
        }
      </React.Fragment>
    )
  }

  const ProfileContent = () => {
    return (
      <>
        {activeTab === 'feeds' && <Feeds data={currentUserPosts}/>}
        {activeTab === 'about' && <AboutSection currentUser={currentUser} isLoading={isLoading} setUserReady={setUserReady}/>}
        {activeTab === 'photos' && <PhotosSection data={currentUserPostImages}/>}
        {activeTab === 'followers' && <FriendList data={currentUserFollowers} emptyDataText='You have no followers yet' isLoading={isLoading}/>}
        {activeTab === 'followings' && <FriendList data={currentUserFollowings} emptyDataText='You are following anyone yet' isLoading={isLoading}/>}
        {activeTab === 'saved posts' && <SavedPostsSection data={currentUserSavedPosts}/>}
        {activeTab === 'userlist' && <div className='lg:hidden'><UserList/></div>}
      </>
    )
  }

  return (
    <ProfileLayout 
      leftSection={<MainPageProfileNav/>} 
      middleSection={<ProfileContent/>}
      mobileProfileNavigation={<ProfileNavigation/>}
      rightSection={<React.Fragment>{ noProfile ? '' : <UserList/> }</React.Fragment>}
      currentUser={currentUser}
      getCurrentUser={getCurrentUser}
      setUserReady={setUserReady}
    />
  )
}

export default withAuth(Profile);
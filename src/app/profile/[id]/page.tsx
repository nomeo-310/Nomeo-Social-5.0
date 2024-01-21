
"use client"

import React from 'react'
import withAuth from '@/utils/withAuth';
import { useParams } from 'next/navigation';
import ProfileLayout from '@/components/ProfileLayout';
import CardComponent from '@/components/CardComponent';
import Feeds from '@/components/Feeds';
import { useSession } from 'next-auth/react';
import { BookMarkOutlined, Contacts, FollowedUserOutlined, Gallery, GroupUserOutlined, InfoFilled, RSSFeeds, Refresh } from '@/components/IconPacks';
import { AboutSection } from './components/PageComponents';
import UserList from '@/components/UserList';

const Profile = () => {
  const {data: session, update}:any = useSession();
  const [currentUser, setCurrentUser] = React.useState<any>({});
  const [userReady, setUserReady] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const params = useParams();
  const {id}:any = params;

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

  React.useEffect(() => {
    if (id) {
      getCurrentUser();
    }
    }, [id])


  const updateCurrentSession = async () => {
    const response = await fetch(`/api/getSingleUser/${id}`, {
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
      {name:'retweets', inactiveicon: <Refresh className='lg:w-6 lg:h-6 w-5 h-5'/>, activeicon: <Refresh className='lg:w-7 w-6 lg:h-7 h-6'/>}
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
  return (
    <ProfileLayout 
      leftSection={
        <React.Fragment>
          {currentUser?._id === session?.user._id && 
            <CardComponent overflow>
              <ProfileNavigation/>
            </CardComponent>
          }
        </React.Fragment>
      } 
      middleSection={
        <>
          {activeTab === 'feeds' && <Feeds data={[]}/>}
          {activeTab === 'about' && <AboutSection currentUser={currentUser} isLoading={isLoading} setUserReady={setUserReady}/>}
          {activeTab === 'photos' && <CardComponent>Photos</CardComponent>}
          {activeTab === 'followers' && <CardComponent>Followers</CardComponent>}
          {activeTab === 'followings' && <CardComponent>Followings</CardComponent>}
          {activeTab === 'saved posts' && <CardComponent>Saved Posts</CardComponent>}
          {activeTab === 'retweets' && <CardComponent>Retweets</CardComponent>}
          {activeTab === 'userlist' && <div className='lg:hidden'><UserList/></div>}
        </>
      }
      mobileProfileNavigation={<ProfileNavigation/>}
      rightSection={
        <React.Fragment>
          <UserList/>
        </React.Fragment>
      }
      currentUser={currentUser}
      getCurrentUser={getCurrentUser}
      setUserReady={setUserReady}
    />
  )
}

export default withAuth(Profile);
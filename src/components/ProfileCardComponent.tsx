"use client"

import React from 'react'
import { ReactElement } from 'react'
import Link from 'next/link'
import IconGenerator from './SocialIcons'
import ImageAvatar from './ImageAvatar'
import { useSession } from 'next-auth/react'
import { MailOutlined, MapOutlined, UserOutlinedAlt } from './IconPacks'

const ProfileCardComponent = ():ReactElement => {
  const {data: session}:any = useSession();

  console.log(session)

  return (
    <React.Fragment>
      <div className='flex gap-2 border-b -mx-3 p-3 items-center'>
        <div className='w-fit -ml-7 md:-ml-8 lg:-ml-16'>
          <ImageAvatar size='large' profilePicture={session?.user?.profileImage?.url}/>
        </div>
        <div className='flex-col flex lg:gap-2 gap-1'>
          { session?.user.profileCreated && 
            <div className='flex gap-2 items-center mb-4 text-gray-400 dark:text-white'>
              <UserOutlinedAlt className='lg:w-6 lg:h-6 w-5 h-5'/>
              <h2 className='md:text-base text-sm capitalize'>{session?.user.surname} {session?.user.lastname}</h2>
            </div>
          }
          <div className='flex items-center gap-2 mb-1 text-gray-400 dark:text-white'>
            <MailOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>
            <h2 className='md:text-[13px] text-xs'>{session?.user.email}</h2>
          </div>
          { session?.user.profileCreated && 
            <div className='flex items-center gap-2 text-gray-400 dark:text-white mb-1'>
              <MapOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>
              <h2 className='md:text-[13px] text-xs capitalize'>{session?.user.city}, {session?.user.state}.</h2>
            </div>
          }
        </div>
      </div>
      { session?.user.profileCreated && 
        <React.Fragment>
          <div className='flex gap-3 items-center border-b -mx-3 px-3 py-2'>
            { session?.user.otherSocialProfiles && session?.user.otherSocialProfiles.map((socialProfile:string, index:number) => (
                <IconGenerator value={socialProfile} key={index}/>
              )) 
            }
          </div>
          <div className='flex -mx-3 border-b'>
            <div className='flex items-center gap-3 flex-col flex-1 py-2 border-r'>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px] capitalize'>followers</h2>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px]'>{session?.user.followers.Length}</h2>
            </div>
            <div className='flex items-center gap-3 flex-col flex-1 py-2 border-r'>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px] capitalize'>followings</h2>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px]'>{session?.user.followings.Length}</h2>
            </div>
            <div className='flex items-center gap-3 flex-col flex-1 py-2'>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px] capitalize'>posts</h2>
              <h2 className='text-gray-400 dark:text-white text-xs md:text-[13px]'>{session?.user.savedPosts.Length}</h2>
            </div>
          </div>
        </React.Fragment>
      }
      <div className='mt-8'>
        <Link href={`/profile/${session?.user._id}`} className='bg-tertiaryBlue text-white p-2 lg:p-[10px] rounded-md w-full block text-center lg:text-[14px] text-[13px] leading-[1.1] capitalize'>
          view full profile
        </Link>
      </div>
    </React.Fragment>
  )
}

export default ProfileCardComponent;

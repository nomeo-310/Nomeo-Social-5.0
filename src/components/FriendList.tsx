import React from 'react'
import CardComponent from './CardComponent';
import ImageAvatar from './ImageAvatar';
import Link from 'next/link';
import { FullScreenLoading } from './LoadingAnimation';

type userProps = {
  _id: string
  profilePicture: string
  username: string
  city: string
  state: string
  occupation: string
}

type friendListProps = {
  data: any[]
  isLoading: boolean
  emptyDataText: string
}

const FriendList = ({data, isLoading, emptyDataText}:friendListProps) => {

  const User = ({profilePicture, username, city, state, _id, occupation}:userProps) => {
    return (
      <Link className='w-full flex gap-3 py-2 px-3 border-b last:border-b-0' href={`/profile/${_id}`}>
        <div>
          <ImageAvatar size='medium' profilePicture={profilePicture}/>
        </div>
        <div className='flex flex-col gap-[2px]'>
          <h2 className='text-sm'>@{username}</h2>
          <h2 className='capitalize text-sm'>{city}, {state}</h2>
          <h2 className='capitalize text-sm'>{occupation}</h2>
        </div>
      </Link>
    )
  }

  return (
    <React.Fragment>
      { isLoading ? <FullScreenLoading spinnerSize='70' minHeight='lg:min-h-[590px] min-h-[600px]'/> : 
        <React.Fragment>
          {data && data.length > 0 ? 
          <CardComponent noPadding>
            <div className='min-h-[25rem] py-1'>
              { data.map((i:any, index:number) => (
                <User
                  key={`user_${index}`}
                  profilePicture={i.profileImage.url}
                  username={i.username}
                  city={i.city}
                  state={i.state}
                  _id={i._id}
                  occupation={i.occupation}
                />
              ))}
            </div>
          </CardComponent> :
          <CardComponent>
            <h2 className='lg:text-base text-sm'>{emptyDataText}</h2>
          </CardComponent>
          }
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default FriendList
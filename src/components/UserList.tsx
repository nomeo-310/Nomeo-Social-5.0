import React from 'react'
import CardComponent from './CardComponent';
import Pagination from './Pagination';
import { useSession } from 'next-auth/react'
import ImageAvatar from './ImageAvatar';
import Link from 'next/link';

type userProps = {
  _id: string
  profilePicture: string
  username: string
  city: string
  state: string
  occupation: string
}

const UserList = () => {
  const {data: session}  = useSession();
  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const [users, setUsers] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState<number>(1)

  const getAllUsers = async (page:number) => {
    try {
      const response = await fetch(`/api/getUsers?page=${page}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        cache: 'no-store'
      })
      const data:any = await response.json();
      setUsers(data?.users)
      setTotalPages(data?.totalPages);
    } catch (error) {
      console.log(error)
    }
  }

  console.log(users, totalPages)

  React.useEffect(() => {
    if (session?.user) {
      getAllUsers(currentPage);
    }
  }, [currentPage, session?.user])

  const User = ({profilePicture, username, city, state, _id, occupation}:userProps) => {
    return (
      <Link className='w-full flex gap-3 py-2 px-3 border-b last:border-b-0 text-sm' href={`/profile/${_id}`}>
        <div>
          <ImageAvatar size='medium' profilePicture={profilePicture}/>
        </div>
        <div className='flex flex-col gap-[2px]'>
          <h2 className=''>@{username}</h2>
          <h2 className='capitalize'>{city}, {state}</h2>
          <h2 className='capitalize'>{occupation}</h2>
        </div>
      </Link>
    )
  }

  return (
    <div>
      <CardComponent noPadding>
        <div className='min-h-[25rem] py-1'>
          {users && users.length > 0 && users.map((i:any, index:number) => (
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
      </CardComponent>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default UserList
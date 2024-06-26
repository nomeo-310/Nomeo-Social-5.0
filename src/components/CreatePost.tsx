/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CardComponent from './CardComponent'
import ImageAvatar from './ImageAvatar'
import { ArrowDown, ArrowUp,  CloseIconCircle, EarthOutlined, GroupUserOutlined, HashTags, ImageOutlined, MapFilled, MapOutlined, NotAllowed, SendOutlined } from './IconPacks'
import useInput from '@/hooks/useInput'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { useNotifications } from '@/hooks/useNotifications'
import { Alert } from './Notifications'


const CreatePost = () => {
  const {data: session, update}:any = useSession();

  const [status, setStatus] = React.useState('public');
  const [showStatus, setShowStatus] = React.useState(false);
  const [showHashTag, setShowHashTag] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [postReady, setPostReady] = React.useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = React.useState(false);
  const [postImage, setPostImage] = React.useState<File | null>(null);
  const [currentState, setCurrentState] = React.useState('');
  const [currentCity, setCurrentCity] = React.useState('');

  const postMessage = useInput('');
  const hashTag = useInput('');
  const longitude = useInput('');
  const lattitude = useInput('');

  const API_KEY = 'dcd7443f15784860a5eccc7e7702e18d';

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude.setValue(String(position.coords.longitude))
      lattitude.setValue(String(position.coords.latitude))
    })
  }, []);

  React.useEffect(() => {
    if (useCurrentLocation) {
      fetchLocation()
    } else {
      setCurrentState(session?.user.state)
      setCurrentCity(session?.user.city)
    }
  }, [useCurrentLocation]);

  React.useEffect(() => {
    if (postReady) {
      updateCurrentSession();
    } 
  }, [postReady]);

  const {displayAlert, setAlertType, setDisplayAlert, setAlertMessage, alertMessage, alertType } = useNotifications();

  const fetchLocation = async () => {
    setUseCurrentLocation(true);

    await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lattitude.value}+${longitude.value}&key=${API_KEY}`).then((response:any) => {
    const { components } = response?.data.results[0];
    setCurrentCity(components.county ? components.county : session?.user.city)
    setCurrentState(components.state && components.county ? components.state : session?.user.state)
    })
  }

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList
    setPostImage(file?.[0])
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

  const uploadPostImage = async () => {
    if (postImage) {
      const formData = new FormData();
      formData.append('file', postImage as File);
      formData.append('upload_preset', 'postImages');
  
      const data = await fetch('https://api.cloudinary.com/v1_1/dqj9nko02/image/upload', {
        method: 'POST',
        body: formData
      }).then((response) => response.json());
  
      return data
    }
  }

  const handleCreatePost = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true)
    const data:any = await uploadPostImage();

    const post = {
      postStatus: status,
      hashTag: hashTag.value,
      postImage: { public_id: data?.public_id, url: data?.secure_url },
      postAuthorProfilePicture: session?.user.profileImage.url,
      postMessage: postMessage.value,
      postLocation: currentCity + ', ' + currentState,
      postAuthorId: session?.user._id,
      postAuthor: session?.user.surname + ' ' + session?.user.lastname,
    }

    try {
      await fetch('/api/createPost', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      }).then((response) => {
        if (response.status === 200) {
          setDisplayAlert(true);
          setAlertType('success')
          setAlertMessage('Your post was successfully created')
        }
      })
    } catch (error) {
      setDisplayAlert(true);
      setAlertType('error')
      setAlertMessage('Internal server error try again later!')
    }
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <Alert 
        type={alertType} 
        message={alertMessage} 
        displayAlert={displayAlert} 
        onClick={() => {setPostReady(true), setDisplayAlert(false)}} 
      />
      <CardComponent overflow>
        <form onSubmit={handleCreatePost} className='p-1'>
          <div className='lg:h-[55px] h-[50px] relative'>
            <div className='absolute -left-1 -top-1'>
              <ImageAvatar size='extraSmall' profilePicture={session?.user?.profileImage?.url}/>
            </div>
            <textarea name="" id="postMessage" className='border resize-none rounded h-full w-full lg:pl-[45px] pl-[40px] p-2 outline-none focus:outline-none text-[13px] lg:text-[14px] leading-normal bg-inherit dark:placeholder:text-white' placeholder='post somethings...' value={postMessage.value} onChange={postMessage.onTextAreaChange}/>
          </div>
          <div className='pt-3 flex justify-between items-center'>
            <div className='flex lg:gap-4 gap-3 text-gray-400 dark:text-white'>
              <label htmlFor='file'>
                <div className={`flex items-center gap-1 cursor-pointer ${postImage ? 'text-tertiaryBlue' : ''}`}>
                  <ImageOutlined className='lg:w-5 lg:h-5 w-4 h-4'/>
                  <h2 className='text-sm lg:text-[15px] capitalize leading-normal'>Image</h2>
                </div>
                <input type="file" name="postImage" className='hidden cursor-pointer' id='file' onChange={handleSelectFile}/>
              </label>
              <span className={`flex items-center gap-1 cursor-pointer ${useCurrentLocation ? 'text-tertiaryBlue' : ''}`} onClick={() => setUseCurrentLocation(!useCurrentLocation)}>
                {useCurrentLocation ? <MapFilled className='lg:w-5 lg:h-5 w-4 h-4 text-tertiaryBlue'/> :<MapOutlined className='lg:w-5 lg:h-5 w-4 h-4'/>}
                <h2 className='text-sm lg:text-[15px] capitalize leading-normal'>Location</h2>
              </span>
              <span className={`flex items-center gap-1 cursor-pointer ${showHashTag ? 'text-tertiaryBlue' : ''}`} onClick={() => setShowHashTag(!showHashTag)}>
                <HashTags className='lg:w-5 lg:h-5 w-4 h-4'/>
                <h2 className='text-sm lg:text-[15px] capitalize leading-normal'>hashtags</h2>
              </span>
              <div className='flex gap-1 relative cursor-pointer text-tertiaryBlue' onClick={() => setShowStatus(!showStatus)}>
                {status === 'public' ? <EarthOutlined className='lg:w-5 lg:h-5 w-4 h-4'/> :
                <GroupUserOutlined className='lg:w-5 lg:h-5 w-4 h-4'/> }
                <h2 className='text-sm lg:text-[15px] capitalize'>{status}</h2>
                { showStatus ? <ArrowUp className='lg:w-5 lg:h-5 w-4 h-4 text-black dark:text-white'/> : <ArrowDown className='lg:w-5 lg:h-5 w-4 h-4 text-black dark:text-white'/> }
                { showStatus &&
                  <div className='p-1 shadow flex flex-col absolute top-6 right-0 rounded bg-white text-black dark:bg-[#3d3d3d] dark:text-white overflow-hidden cursor-pointer dark:border z-[7000]'>
                    <span onClick={() => {setStatus('public'), setShowStatus(false)}} className='rounded px-1 py-[2px] text-sm lg:text-[15px] capitalize hover:bg-tertiaryBlue hover:text-white leading-normal'>public</span>
                    <span onClick={() => {setStatus('private'), setShowStatus(false)}} className='px-1 py-[2px] text-sm lg:text-[15px] capitalize hover:bg-tertiaryBlue hover:text-white rounded leading-normal'>private</span>
                  </div>
                }
              </div>
            </div>
            <button type="submit" disabled={postMessage.value === '' || postMessage.value.length < 20} className='text-primaryGreen disabled:text-gray-400 dark:disabled:text-white'>
              {isLoading ? <h2 className='text-sm lg:text-[15px] leading-normal'>...Creating</h2> :  <SendOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>}
            </button>
          </div>
          { showHashTag &&
            <input type="text" name="hashTags" id="hashTags" placeholder='write with comma between each tags...' className='w-full mt-3 p-2 outline-none focus:outline-none border rounded lg:text-[15px] text-[13px] dark:placeholder:text-white bg-inherit' value={hashTag.value} onChange={hashTag.onValueChange}/>
          }
          { postImage &&
            <div className='w-full flex items-center justify-center rounded-md overflow-hidden my-3 lg:h-[280px] h-[250px] relative'>
              <Image src={URL.createObjectURL(postImage)} alt="" className='w-full h-full object-cover' fill />
              <CloseIconCircle className='lg:w-7 lg:h-7 w-6 h-6 text-tertiaryRed cursor-pointer absolute top-2 right-2' onClick={()=> setPostImage(null)}/>
            </div>
          }
        </form>
      </CardComponent>
    </React.Fragment>
  )
}

export default CreatePost;
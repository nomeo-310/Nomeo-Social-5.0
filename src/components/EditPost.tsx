/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import CardComponent from './CardComponent'
import ImageAvatar from './ImageAvatar'
import { ArrowDown, ArrowUp, CloseIconCircle, EarthOutlined, GroupUserOutlined, HashTags, ImageOutlined, MapFilled, MapOutlined, SendOutlined } from './IconPacks'
import useInput from '@/hooks/useInput'
import { createHashTag } from '@/hooks/formatHasTag'
import axios from 'axios'
import Image from 'next/image'
import { useNotifications } from '@/hooks/useNotifications'
import { Alert } from './Notifications'

type Props = {
  _id: string
  postLocation: string
  postMessage: string
  postImage: {public_id: string, url: string} 
  hashTag: string
  postStatus: string
  onClick: () => void
}

const EditPost = ({_id, postStatus, postMessage, hashTag, postImage, postLocation, onClick}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const locationArray = postLocation.split(',')

  const [currentState, setCurrentState] = React.useState(locationArray[1]);
  const [currentCity, setCurrentCity] = React.useState(locationArray[0]);
  const isCurrentLocation = locationArray[0] === currentCity && locationArray[1] === currentState;
  const [status, setStatus] = React.useState(postStatus);
  const [showStatus, setShowStatus] = React.useState(false);
  const [showHashTag, setShowHashTag] = React.useState(hashTag ? true : false);
  const [useCurrentLocation, setUseCurrentLocation] = React.useState(isCurrentLocation);
  const [newPostImage, setNewPostImage] = React.useState<File | null>(null);

  const newPostMessage = useInput(postMessage);
  const newHashTag = useInput(hashTag);
  const longitude = useInput('');
  const lattitude = useInput('');

  const API_KEY = 'dcd7443f15784860a5eccc7e7702e18d';

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude.setValue(String(position?.coords.longitude))
      lattitude.setValue(String(position?.coords.latitude))
    })
  }, []);

  React.useEffect(() => {
    fetchLocation()
  }, []);

  const {displayAlert, setAlertType, setDisplayAlert, setAlertMessage, alertMessage, alertType } = useNotifications();


  const fetchLocation = async () => {
    try {
      await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lattitude.value}+${longitude.value}&key=${API_KEY}`).then((response:any) => {
      const { components } = response?.data.results[0];
      setCurrentCity(components.county)
      setCurrentState(components.state)
      setUseCurrentLocation(true)
      })
    } catch (error) {
      setUseCurrentLocation(false)
      console.log(error)
    }
  }

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files as FileList
    setNewPostImage(file?.[0])
  }

  const uploadPostImage = async () => {
    if (newPostImage) {
      const formData = new FormData();
      formData.append('file', newPostImage as File);
      formData.append('upload_preset', 'postImages');
  
      const data = await fetch('https://api.cloudinary.com/v1_1/dqj9nko02/image/upload', {
        method: 'POST',
        body: formData
      }).then((response) => response.json());
  
      return data
    }
  }

  const handleEditPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true)
    const newData = await uploadPostImage();
    const newPost = {
      status: status,
      hashTag: newHashTag.value,
      postImage: {public_id: `${newPostImage ? newData.public_id : postImage.public_id}`, url: `${newPostImage ? newData.secure_url : postImage.url}`},
      postMessage: newPostMessage.value,
      postLocation: currentCity + ', ' + currentState
    }
    try {
      await fetch(`/api/editPost/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }).then((response) => {
        if (response.status === 200) {
          setDisplayAlert(true);
          setAlertType('success')
          setAlertMessage('Your post was successfully updated')
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
        onClick={() => {window.location.reload(), setDisplayAlert(false)}} 
      />
      <CardComponent overflow>
        <div className='flex justify-end mb-3'>
          <CloseIconCircle className='w-7 h-7 text-tertiaryRed cursor-pointer ' onClick={onClick}/>
        </div>
        <form action="" className='p-1' onSubmit={handleEditPost}>
          <div className='lg:h-[55px] h-[50px] relative'>
            <div className='absolute -left-1 -top-1'>
              <ImageAvatar size='extraSmall' profilePicture={''}/>
            </div>
            <textarea name="" id="postMessage" className='border resize-none rounded h-full w-full lg:pl-[45px] pl-[40px] p-2 outline-none focus:outline-none text-[13px] lg:text-[15px] leading-[1.1] bg-inherit dark:placeholder:text-white' placeholder='post somethings...' value={newPostMessage.value} onChange={newPostMessage.onTextAreaChange}/>
          </div>
          <div className='pt-3 flex justify-between items-center'>
            <div className='flex lg:gap-4 gap-3 text-gray-400 dark:text-white'>
              <label htmlFor='file'>
                <div className={`flex gap-1 cursor-pointer ${postImage ? 'text-tertiaryBlue' : ''}`}>
                  <ImageOutlined className='lg:w-5 lg:h-5 w-4 h-4'/>
                  <h2 className='text-sm lg:text-[15px] capitalize'>Image</h2>
                </div>
                <input type="file" name="postImage" className='hidden' id='file' onChange={handleSelectFile}/>
              </label>
              <span className={`flex gap-1 cursor-pointer ${useCurrentLocation ? 'text-tertiaryBlue' : ''}`} onClick={() => setUseCurrentLocation(!useCurrentLocation)}>
                {useCurrentLocation ? <MapFilled className='lg:w-5 lg:h-5 w-4 h-4 text-tertiaryBlue'/> :<MapOutlined className='lg:w-5 lg:h-5 w-4 h-4'/>}
                <h2 className='text-sm lg:text-[15px] capitalize'>Location</h2>
              </span>
              <span className={`flex gap-1 cursor-pointer ${showHashTag ? 'text-tertiaryBlue' : ''}`} onClick={() => setShowHashTag(!showHashTag)}>
                <HashTags className='lg:w-5 lg:h-5 w-4 h-4'/>
                <h2 className='text-sm lg:text-[15px] capitalize'>hashtags</h2>
              </span>
              <div className='flex gap-1 relative cursor-pointer text-tertiaryBlue' onClick={() => setShowStatus(!showStatus)}>
                {status === 'public' ? <EarthOutlined className='lg:w-5 lg:h-5 w-4 h-4'/> :
                <GroupUserOutlined className='lg:w-5 lg:h-5 w-4 h-4'/> }
                <h2 className='text-sm lg:text-[15px] capitalize'>{status}</h2>
                { showStatus ? <ArrowUp className='lg:w-5 lg:h-5 w-4 h-4 text-black dark:text-white'/> : <ArrowDown className='lg:w-5 lg:h-5 w-4 h-4 text-black dark:text-white'/> }
                { showStatus &&
                  <div className='p-1 shadow flex flex-col absolute top-6 right-0 rounded bg-white text-black dark:bg-[#3d3d3d] dark:text-white overflow-hidden cursor-pointer dark:border z-[7000]'>
                    <span onClick={() => {setStatus('public'), setShowStatus(false)}} className='rounded px-1 py-[2px] text-sm lg:text-[15px] capitalize hover:bg-tertiaryBlue hover:text-white'>public</span>
                    <span onClick={() => {setStatus('private'), setShowStatus(false)}} className='px-1 py-[2px] text-sm lg:text-[15px] capitalize hover:bg-tertiaryBlue hover:text-white rounded'>private</span>
                  </div>
                }
              </div>
            </div>
            <button type="submit" className='text-primaryGreen'>
              {isLoading ? <h2 className='text-sm'>...updating</h2> : <SendOutlined className='lg:w-6 lg:h-6 w-5 h-5'/>}
            </button>
          </div>
          { showHashTag &&
            <input type="text" name="hashTags" id="hashTags" placeholder='write with comma between each tags...' className='w-full mt-3 p-2 outline-none focus:outline-none border rounded lg:text-[15px] text-[13px] dark:placeholder:text-white' value={newHashTag.value} onChange={newHashTag.onValueChange}/>
          }
          { newPostImage ?
            <div className='w-full flex items-center justify-center rounded-md overflow-hidden my-3 lg:h-[280px] h-[250px] relative'>
              <Image src={ URL.createObjectURL(newPostImage) } alt="" className='w-full h-full object-cover' fill />
              <CloseIconCircle className='lg:w-8 lg:h-8 w-7 h-7 text-tertiaryRed cursor-pointer absolute top-2 right-2' onClick={()=> setNewPostImage(null)}/>
            </div> :
            <>
              { postImage.url && 
                <div className='w-full flex items-center justify-center rounded-md overflow-hidden my-3 lg:h-[280px] h-[250px] relative'>
                  <Image src={postImage.url} alt="" className='w-full h-full object-cover' fill />
                </div>
              }
            </>
          }
        </form>
      </CardComponent>
    </React.Fragment>
  )
}

export default EditPost;
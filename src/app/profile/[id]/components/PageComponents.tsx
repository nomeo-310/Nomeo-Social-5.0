/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import CardComponent from '@/components/CardComponent'
import { AddUserOutlined, CameraOutlined, CheckCircleFilled, CloseIconCircle, CodeOutlined, DirectionOutlined, Ellipsis, GamesOutlined, ImageAddOutlined, MovieOutlined, MusicOutlined, NFTOutlined, NewsOutlined, RestaurantOutlined, ShirtOutlined, ShoppingBagOutlined, UnfollowUserOutlined, WineGlassOutlined } from '@/components/IconPacks'
import ImageAvatar from '@/components/ImageAvatar'
import { FullScreenLoading } from '@/components/LoadingAnimation'
import { Alert } from '@/components/Notifications'
import { useNotifications } from '@/hooks/useNotifications'
import { CustomSelectComponent, DateInputComponent, InputComponent, RadioInputComponent, TextAreaComponent } from '@/components/InputComponents'
import useInput from '@/hooks/useInput'
import { ageCalculator } from '@/hooks/ageCalculator'
import { birthayGenerator } from '@/hooks/birthdayGenerator'
import { aboutProps, itemProp, itemsProps } from '@/types/types'
import { timeFormatter } from '@/hooks/timeFormatter'
import { PlainSinglePost } from '@/components/SinglePost'
import { allNigerianStates } from '../../../../../public/data/allNigerianSAtate'

interface photoProps {
  data: [{public_id: string, url: string}]
}

interface savedPostProps {
  data: any[]
}


const AboutSection = ({currentUser, isLoading, setUserReady}: aboutProps) => {
  
    const {data: session}:any = useSession();
    const userLoggedIn = currentUser?._id === session.user?._id;
    const profileCreated = currentUser?.profileCreated === true;
    const alreadyFollowing = currentUser?.followers && currentUser?.followers.includes(session.user?._id)

    const [editProfile, setEditProfile] = React.useState(false);

    const {displayAlert, setDisplayAlert, alertMessage, setAlertMessage, alertType, setAlertType} = useNotifications()
    const [submitSuccess, setSubmitSuccess] = React.useState(false);

    const [showMenu, setShowMenu] = React.useState(false);
    const [editCoverImage, setEditCoverImage] = React.useState(false);
    const [editProfileImage, setEditProfileImage] = React.useState(false);
    const [cover, setCover] = React.useState<File | null>(null);
    const [profile, setProfile] = React.useState<File | null>(null);
    const [loading, setLoading] = React.useState(false);

  
    const Menu = ()=> {
      const MenuItem = ({onClick, itemName}:itemProp)=> {
        return (
          <span onClick={onClick} className='lg:text-sm text-xs capitalize rounded hover:bg-tertiaryBlue hover:text-white px-1'>
            {itemName}
          </span>
        )
      }
      return (
        <div className='absolute right-3 top-6 flex flex-col bg-white p-1 rounded cursor-pointer'>
          <MenuItem itemName='change profile image' onClick={() => {setShowMenu(false), setEditProfileImage(true)}}/>
          <MenuItem itemName='change cover image' onClick={() => {setShowMenu(false), setEditCoverImage(true)}} />
          <MenuItem itemName='edit profile' onClick={() => {setEditProfile(!editProfile), setShowMenu(false)}}/>
        </div>
      )
    }

    React.useEffect(() => {
      if (editCoverImage) {
        setEditProfileImage(false)
      }
    }, [editCoverImage])

    const newState = useInput('');
    const newBio = useInput('');
    const newUsername = useInput('');
    const newSurname = useInput('');
    const newLastname = useInput('');
    const newOccupation = useInput('');
    const newMobileNumber = useInput('');
    const newHobbies = useInput('');
    const newAddress = useInput('');
    const newBirthDate = useInput('');
    const newCity = useInput('');
    const item_1 = useInput('');
    const item_2 = useInput('');
    const item_3 = useInput('');
    const item_4 = useInput('');
    const newStatus = useInput('');

    const urls:string[] = Array.of(item_1.value, item_2.value, item_3.value, item_4.value)
    .filter((d) => d !== "").filter((d) => d !== undefined);

    const [newAge, setNewAge] = React.useState('');
    const [newBirthDateValue, setNewBirthDateValue] = React.useState('');
    const [newBirthDay, setNewBirthDay] = React.useState('');
    const [newInterests, setNewInterests] = React.useState<string[]>([]);
    const age = ageCalculator(newBirthDate.value) + ' years';
    const numericalAge = ageCalculator(newBirthDate.value);
    const birthday = birthayGenerator(newBirthDate.value)
    
    // React.useEffect(() => {
    // if (numericalAge < 15 ) {
    //   setNewAge(currentUser.age)
    //   setNewBirthDateValue(currentUser.birthdate)
    //   setNewBirthDay(currentUser.birthday)
    // } else {
    //   setNewAge(age)
    //   setNewBirthDateValue(newBirthDate.value)
    //   setNewBirthDay(birthday)
    // }
    // }, [age, birthday, currentUser.age, currentUser.birthdate, currentUser.birthday, newBirthDate.value, numericalAge])

    const updateProfileData = {
      username: newUsername.value,
      surname: newSurname.value,
      lastname: newLastname.value,
      occupation: newOccupation.value,
      hobbies: newHobbies.value.split(','),
      address: newAddress.value,
      birthdate: newBirthDateValue,
      age: newAge,
      birthday: newBirthDay,
      mobileNumber: newMobileNumber.value,
      city: newCity.value,
      state: newState.selected,
      bio: newBio.value,
      otherSocialProfiles: urls,
      interests: newInterests,
      status: newStatus.value
    }

    React.useEffect(() => {
      if (editProfile) {
        newBio.setValue(currentUser?.bio)
        newUsername.setValue(currentUser?.username)
        newSurname.setValue(currentUser?.surname)
        newLastname.setValue(currentUser?.lastname)
        newOccupation.setValue(currentUser?.occupation)
        newMobileNumber.setValue(currentUser?.mobileNumber)
        newAddress.setValue(currentUser?.address)
        newHobbies.setValue(currentUser?.hobbies.join(','))
        newBirthDate.setValue(currentUser?.birthdate)
        newCity.setValue(currentUser?.city)
        newState.setSelected(currentUser?.state)
        item_1.setValue(currentUser?.otherSocialProfiles[0])
        item_2.setValue(currentUser?.otherSocialProfiles[1])
        item_3.setValue(currentUser?.otherSocialProfiles[2])
        item_4.setValue(currentUser?.otherSocialProfiles[3])
        setNewInterests(currentUser.interests)
        newStatus.setValue(currentUser.status)

      }
    }, [currentUser?.bio, currentUser?.hobbies, currentUser?.lastname, currentUser?.mobileNumber, currentUser?.occupation, currentUser?.surname, currentUser?.username, editProfile, newState?.setSelected])
    

    const handleSelectCoverImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files as FileList
      setCover(file?.[0])
    }

    const handleSelectProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files as FileList
      setProfile(files?.[0])
    }

    const handleProfileImage = async () => {
      const formData = new FormData();
      formData.append('file', profile as File);
      formData.append('upload_preset', 'profileImages');

      const data = await fetch('https://api.cloudinary.com/v1_1/dqj9nko02/image/upload', {
        method: 'POST',
        body: formData
      }).then((response) => response.json())

      return data
    }

    const handleCoverImage = async () => {
      const formData = new FormData();
      formData.append('file', cover as File);
      formData.append('upload_preset', 'coverImages');

      const data = await fetch('https://api.cloudinary.com/v1_1/dqj9nko02/image/upload', {
        method: 'POST',
        body: formData
      }).then((response) => response.json())

      return data
    }

    const handleCreateProfileImage = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true)
      const data = await handleProfileImage();
      const profileImageData = { public_id: data.public_id, url: data.secure_url}
      try {
        await fetch(`/api/addProfileImage/${session?.user._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(profileImageData)
        }).then((response) => {
          if (response.status === 200) {
            setSubmitSuccess(true)
            setDisplayAlert(true)
            setAlertMessage('Profile image added successfully')
            setAlertType('success')
          } else {
            setSubmitSuccess(false)
            setDisplayAlert(true)
            setAlertMessage('Profile image not added')
            setAlertType('error')
          }
        })
      } catch (error) {
        console.log(error)
        setSubmitSuccess(false)
        setDisplayAlert(true)
        setAlertMessage('Something went wrong, try again later')
        setAlertType('error')
      }
      setLoading(false)
    }

    const handleFollowUser = async () => {
      try {
        const response = await fetch(`/api/addFollower/${session?.user._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({followId: currentUser?._id})
        }).then((response) => response.json());
        setSubmitSuccess(true)
        setDisplayAlert(true)
        setAlertMessage(response?.message)
        setAlertType('success')
      } catch (error) {
        console.log(error)
        setSubmitSuccess(false)
        setDisplayAlert(true)
        setAlertMessage('Something went wrong, try again later')
        setAlertType('error')
      }
      setLoading(false)
    }

    const handleCreateCoverImage = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true)
      const data = await handleCoverImage();
      const coverImageData = { public_id: data.public_id, url: data.secure_url}
      try {
        await fetch(`/api/addCoverImage/${session?.user._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(coverImageData)
        }).then((response) => {
          if (response.status === 200) {
            setSubmitSuccess(true)
            setDisplayAlert(true)
            setAlertMessage('Cover image added successfully')
            setAlertType('success')
          } else {
            setSubmitSuccess(false)
            setDisplayAlert(true)
            setAlertMessage('Cover image not added')
            setAlertType('error')
          }
        })
      } catch (error) {
        console.log(error)
        setSubmitSuccess(false)
        setDisplayAlert(true)
        setAlertMessage('Something went wrong, try again later')
        setAlertType('error')
      }
      setLoading(false)
    }

    const interesList = [
      {name: 'coding', icon: <CodeOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'coding'},
      {name: 'news', icon: <NewsOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'news'},
      {name: 'commerce', icon: <ShoppingBagOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'commerce'},
      {name: 'NFT', icon: <NFTOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'nft'},
      {name: 'restaurants', icon: <RestaurantOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'restaurants'},
      {name: 'wines', icon: <WineGlassOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'wine'},
      {name: 'travels', icon: <DirectionOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'travels'},
      {name: 'movies', icon: <MovieOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'movies'},
      {name: 'photography', icon: <CameraOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'photography'},
      {name: 'music', icon: <MusicOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'music'},
      {name: 'fashion', icon: <ShirtOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'fashion'},
      {name: 'games', icon: <GamesOutlined className='w-5 h-5 lg:w-7 lg:h-7 '/>, id: 'games'}
    ];
  
    const InterestItem = ({id, checkedItem, name, onChange, checked, icon}:itemsProps) => {
      return (
        <div className={`${checked ? 'shadow border-blue-500' : ''} border rounded lg:min-h-[80px] min-h-[90px] p-2 relative flex flex-col items-center justify-center gap-2 text-[#3d3d3d]`}>
          <input type="checkbox" name={name} id={id} className='shadow rounded absolute right-2 top-2' checked={checked} value={checkedItem} onChange={onChange}/>
          <div className={`rounded p-[6px] ${checked ? 'bg-blue-200 shadow border-0' : 'border'}`}>
            {icon}
          </div>
          <h2 className='text-sm capitalize'>{checkedItem}</h2>
        </div>
      )
    }

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value , checked } = event.target;
      if ( checked ) {
        setNewInterests([...newInterests, value])
      }else {
        setNewInterests(newInterests.filter((m:string) => m !== value)) 
      }
    }

    const handleSelectStatus = (event: React.ChangeEvent<HTMLInputElement>)=> {
      const { value } = event.target
      newStatus.setValue(value)
    }


    const handleUpdateProfile = async ()=> {
      setLoading(true)
      try {
        await fetch(`/api/editProfile/${session?.user._id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(updateProfileData)
        }).then((response) => {
          if (response.status === 200) {
            setSubmitSuccess(true)
            setDisplayAlert(true)
            setAlertMessage('You have successfully updated your profile')
            setAlertType('success')
          } else {
            setSubmitSuccess(false)
            setDisplayAlert(true)
            setAlertMessage('Your profile was not updated')
            setAlertType('error')
          }
        })
      } catch (error) {
        console.log(error)
        setSubmitSuccess(false)
        setDisplayAlert(true)
        setAlertMessage('Something went wrong, try it again')
        setAlertType('error')
      }
      setLoading(false)
    }

  return (
    <React.Fragment>
      <Alert 
        type={alertType} 
        message={alertMessage} 
        displayAlert={displayAlert} 
        onClick={submitSuccess ? () => { setUserReady(true), setDisplayAlert(false) } : () => setDisplayAlert(false)}
      />
      { isLoading ? <FullScreenLoading spinnerSize='70' minHeight='lg:min-h-[590px] min-h-[600px]' /> :
        <React.Fragment>
          {/* image header start here*/}
          {editProfile && 
          <div className='flex items-center justify-end mb-5'>
            <CloseIconCircle className='cursor-pointer rotate-90 w-6 h-6 text-secondaryRed' onClick={()=> setEditProfile(!editProfile)}/>
          </div>
          }
          <CardComponent noPadding>
            <div className={`w-full ${editProfile ? '' : 'lg:h-[240px] h-[200px]'}  flex items-center justify-center overflow-hidden relative`}>
              { editCoverImage ?
                <form className='text-gray-400 dark:text-white' onSubmit={handleCreateCoverImage} encType="multipart/form-data">
                  { loading && <div className='absolute left-0 top-0 w-full h-full bg-black/40 z-[900]'/> }
                  <div className='absolute right-2 top-2 flex gap-2'>
                    { loading ? <h2 className='text-sm text-white z-[1000]'>...setting image</h2> : 
                    <>
                      <CloseIconCircle className='cursor-pointer rotate-90 w-6 h-6 text-secondaryRed z-[800]' onClick={cover ? () => setCover(null) : ()=> setEditCoverImage(false)}/>
                      {cover && <button type='submit' className='z-[800]'><CheckCircleFilled className='cursor-pointer w-6 h-6 text-tertiaryGreen'/></button>}
                    </>
                    }
                  </div>
                  {cover ?
                    <Image src={URL.createObjectURL(cover)} alt="default_banner" className='w-full object-cover' fill/> :
                    <label htmlFor='coverImage'>
                      <div className='flex flex-col items-center justify-center cursor-pointer'>
                        <ImageAddOutlined className='w-12 h-12'/>
                        <h2 className='text-sm'>Browse image</h2>
                      </div>
                      <input type="file" name="coverImage" className='hidden cursor-pointer' id='coverImage' onChange={handleSelectCoverImage}/>
                    </label>
                  }
                </form> :
                <>
                  {!editProfile && 
                    <>
                    { currentUser?.coverImage?.url === '' ?
                      <Image src='/images/defaultCoverImage.jpg' alt="default_banner" className='w-full object-cover' fill/> :
                      <Image src={currentUser?.coverImage?.url} alt="default_banner" className='w-full object-cover' fill/>
                    }
                    </>
                  }
                  { !userLoggedIn &&
                    <button className='absolute bottom-3 right-3 z-[1500] bg-tertiaryBlue text-white px-3 py-1 rounded text-sm flex items-center gap-1' onClick={handleFollowUser}>
                      {alreadyFollowing ? <UnfollowUserOutlined className='w-[18px] h-[18px]'/> : <AddUserOutlined className='w-[18px] h-[18px]'/> }
                      {alreadyFollowing ? <h2>Unfollow User</h2> : <h2>Follow User</h2> }
                    </button>
                  }
                </>
              }
              { editCoverImage ? '' : 
                <>
                  { userLoggedIn && <Ellipsis className='cursor-pointer rotate-90 w-6 h-6 absolute right-2 top-0 text-white' onClick={()=> setShowMenu(!showMenu)}/> }
                </>
              }
              { editProfileImage ?
                <form onSubmit={handleCreateProfileImage} className="absolute left-3 top-3 xl:w-36 xl:h-36 w-32 h-32 flex justify-center items-center bg-white rounded overflow-hidden text-gray-400 dark:text-white" encType="multipart/form-data">
                  { loading && <div className='absolute left-0 top-0 xl:w-36 xl:h-36 w-32 h-32 bg-black/40 z-[900]'/> }
                  <div className='absolute left-2 top-2 flex gap-2'>
                    { loading ? <h2 className='text-sm text-white z-[1000]'>...setting image</h2> : 
                      <>
                        <CloseIconCircle className='cursor-pointer w-6 h-6 text-secondaryRed z-[800]' onClick={profile ? () => setProfile(null) : ()=> setEditProfileImage(false)}/>
                        {profile && <button type='submit' className='z-[800]'><CheckCircleFilled className='cursor-pointer w-6 h-6 text-tertiaryGreen'/></button>}
                      </> 
                    }
                  </div>
                  { profile ?
                    <Image src={URL.createObjectURL(profile)} alt="default_banner" className='w-full object-cover' fill/>:
                    <label htmlFor='profileImage'>
                      <div className='flex flex-col items-center justify-center cursor-pointer '>
                        <ImageAddOutlined className='w-9 h-9'/>
                        <h2 className='text-sm'>Browse image</h2>
                      </div>
                      <input type="file" name="profileImage" className='hidden cursor-pointer' id='profileImage' onChange={handleSelectProfileImage}/>
                    </label>
                  }
                </form> :
                <>
                  { !editCoverImage &&
                    <div className="absolute left-3 top-3">
                      <ImageAvatar size='large' profilePicture={currentUser?.profileImage?.url} />
                    </div>
                  }
                </>
              }
              { showMenu && <Menu/> }
            </div>
            {!editCoverImage && 
              <>
                { currentUser?.profileCreated && 
                  <div className='lg:p-3 p-2'>
                    {editProfile ? 
                      <TextAreaComponent 
                        title='bio' 
                        value={newBio.value} maxHeight='h-full'
                        onTextChange={newBio.onTextAreaChange}
                        name='bio'
                        placeholder='write anything about yourself or a quote'
                        /> :
                      <p className='lg:text-sm text-xs italic text-gray-400 dark:text-white'>{currentUser?.bio}... {currentUser?.username}</p>
                    }
                  </div>
                }
              </>
            }
          </CardComponent>
          {/* image header ends here*/}
          
          {/* user details start here*/}
          { profileCreated && 
            <CardComponent>
              { editProfile ? 
                <>
                <h2 className='text-sm mb-3'>Personal details</h2>
                <div className='lg:mb-3 mb-2'>
                  <h2 className='ml-2 mb-[3px] text-sm capitalize'>Status</h2>
                  <div className='flex gap-3 items-center'>
                    {['married', 'single', 'divorced', 'in relationship'].map((g:string) => (
                      <RadioInputComponent 
                        name='status' 
                        value={g} 
                        onChange={handleSelectStatus} 
                        checked={g === newStatus.value} 
                        key={g}
                      />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:gap-x-3 gap-x-2">
                  <InputComponent 
                    title='username' 
                    type='text' 
                    placeholder='add new username' 
                    value={newUsername.value}
                    onChange={newUsername.onValueChange}
                    marginBottom
                  />
                  <InputComponent 
                    title='surname' 
                    type='text' 
                    placeholder='add new surname' 
                    value={newSurname.value}
                    onChange={newSurname.onValueChange}
                    marginBottom
                  />
                  <InputComponent 
                    title='lastname' 
                    type='text' 
                    placeholder='add new lastname' 
                    value={newLastname.value}
                    onChange={newLastname.onValueChange}
                    marginBottom
                  />
                  <InputComponent 
                    title='occupation' 
                    type='text' 
                    placeholder='add new occupation' 
                    value={newOccupation.value}
                    onChange={newOccupation.onValueChange}
                    marginBottom
                  />
                  <InputComponent 
                    title='mobile number' 
                    type='text' 
                    placeholder='add new occupation' 
                    value={newMobileNumber.value}
                    onChange={newMobileNumber.onValueChange}
                    marginBottom
                  />
                  <InputComponent 
                    title='hobbies' 
                    type='text' 
                    placeholder='add new set of hobbies' 
                    value={newHobbies.value}
                    onChange={newHobbies.onValueChange}
                    marginBottom
                  />
                  <DateInputComponent
                    title='date of birth'
                    value={newBirthDate.value}
                    onChange={newBirthDate.onValueChange}
                  />
                  <CustomSelectComponent 
                    data={allNigerianStates} 
                    title='state' 
                    placeholder='state'
                    selected={newState.selected}
                    setSelected={newState.setSelected}
                    useSearchBar
                    marginBottom
                  />
                </div>
                  <InputComponent
                    title='city' 
                    type='text' 
                    placeholder='add new city' 
                    value={newCity.value}
                    onChange={newCity.onValueChange}
                    marginBottom
                  />
                  <InputComponent
                    title='address' 
                    type='text' 
                    placeholder='add new address' 
                    value={newAddress.value}
                    onChange={newAddress.onValueChange}
                    marginBottom
                  />
                </> :
                <div className='flex flex-col gap-2'>
                  <h2 className='lg:text-sm text-xs'><span className='font-semibold capitalize'>username</span>: {currentUser.username}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>fullname</span>: {currentUser.surname} {currentUser.lastname}</h2>
                  {userLoggedIn && <h2 className='lg:text-sm text-xs'><span className='font-semibold capitalize'>email</span>: {currentUser.email}</h2>}
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>gender</span>: {currentUser.gender}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>occupation</span>: {currentUser.occupation}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>status</span>: {currentUser.status}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>state</span>: {currentUser.state}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>city</span>: {currentUser.city}</h2>
                  {userLoggedIn && <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>address</span>: {currentUser.address}</h2>}
                  <h2 className='lg:text-sm text-xs'><span className='font-semibold capitalize'>age</span>: {currentUser.age}</h2>
                  {userLoggedIn && <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>birthday</span>: {currentUser.birthday}</h2>}
                  {userLoggedIn && <h2 className='lg:text-sm text-xs'><span className='font-semibold capitalize'>mobile number</span>: {currentUser.mobileNumber}</h2>}
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>hobbies</span>: {currentUser.hobbies.join(' , ')}</h2>
                  <h2 className='lg:text-sm text-xs capitalize'><span className='font-semibold capitalize'>interests</span>: {currentUser.interests.join(' , ')}</h2>
                </div>
              }
            </CardComponent>
          }
          {/* user details ends here*/}
          { editProfile &&
            <CardComponent>
              <InputComponent
                title={'edit social profiles (add more or remove some)'} 
                type={'text'} 
                id={'item_1'} 
                placeholder={'social profile url'} 
                value={item_1.value} 
                onChange={item_1.onValueChange}
                marginBottom
              />
              <InputComponent
                title={''} 
                type={'text'} 
                id={'item_2'} 
                placeholder={'social profile url'} 
                value={item_2.value} 
                onChange={item_2.onValueChange}
                marginBottom
              />
              <InputComponent
                title={''} 
                type={'text'} 
                id={'item_3'} 
                placeholder={'social profile url'} 
                value={item_3.value} 
                onChange={item_3.onValueChange}
                marginBottom
              />
              <InputComponent
                title={''} 
                type={'text'} 
                id={'item_4'} 
                placeholder={'social profile url'} 
                value={item_4.value} 
                onChange={item_4.onValueChange}
              />
            </CardComponent>
          }
          { editProfile && 
            <CardComponent>
              <>
                <h2 className='ml-2 mb-3 text-sm capitalize'>all your interests (remove some or add more)</h2>
                <div className='w-full grid lg:grid-cols-4 grid-cols-3 gap-2'>
                  {interesList.map((interest:any, index:number) => (
                  <InterestItem 
                    id={interest.id} 
                    checkedItem={interest.name} 
                    name='interests' 
                    icon={interest.icon}
                    onChange={handleClick}
                    key={`interest_${index}`}
                    checked={newInterests.includes(interest.name)}
                  />
                  ))}
                </div>
              </>
            </CardComponent>
          }
          {editProfile && 
            <div className='mt-5 mb-8'>
              <button className='bg-secondaryGreen text-white py-[6px] px-4 rounded capitalize text-sm disabled:bg-tertiaryGreen' onClick={handleUpdateProfile} disabled={loading}>{loading ? '...updating profile' : 'update profile'}</button>
            </div>
          }
        </React.Fragment>
      }
    </React.Fragment>
  )
}

const PhotosSection = ({data}:photoProps) => {
  return (
    <React.Fragment>
    { data && data.length > 0 ?
      <div className='w-full grid grid-cols-2 items-start justify-start gap-3 overflow-hidden'>
        {data.map((item:any, index:number) => (
          <div className='w-full' key={item._id}>
            <div className='relative w-full rounded overflow-hidden h-[12rem] flex items-center justify-center'>
              <Image src={item.postImage.url} fill className='object-cover' alt={`postImage_${index}`}/>
            </div>
            <h2 className='mt-1'>{timeFormatter(item.createdAt)}</h2>
          </div>
          ))}
      </div> :
      <CardComponent><h2 className='lg:text-base text-sm'>You have no photos yet</h2></CardComponent>
    }
    </React.Fragment>
  )
}

const SavedPostsSection = ({data}:savedPostProps) => {
  return (
    <React.Fragment>
      { data && data.length > 0 ? 
        <React.Fragment>
          { data.map((item:any, index:number) => (
            <PlainSinglePost key={index} {...item}/>
            ))
          }  
        </React.Fragment> :
        <CardComponent><h2 className='lg:text-base text-sm'>You have not saved any posts yet</h2></CardComponent>
      }
    </React.Fragment>
  )
}

export { AboutSection, PhotosSection, SavedPostsSection };
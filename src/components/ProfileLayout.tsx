"use client"

import React from 'react';
import localFont from 'next/font/local'
import { Bubble, CloseIcon,  LogOut, MenuIcon,  SearchIcon } from './IconPacks'
import ThemeToggler from './ThemeToggler';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ImageAvatar from './ImageAvatar';
import { signOut } from 'next-auth/react';
import { AnimatePresence , motion} from 'framer-motion';
import ProfileMultiStep from './ProfileMultiStep';


interface layoutProps {
  leftSection: React.ReactNode
  middleSection: React.ReactNode
  rightSection?: React.ReactNode
  mobileProfileNavigation?: React.ReactNode
  currentUser: any
  getCurrentUser: () => void
  setUserReady: React.Dispatch<React.SetStateAction<boolean>>
}


const patrick = localFont({src: '../../public/font/PatrickHandSC-Regular.woff2'})

const ProfileLayout = ({leftSection, middleSection, rightSection, mobileProfileNavigation, currentUser, getCurrentUser, setUserReady}:layoutProps) => {
  const {data: session}:any = useSession();

  const noProfile = currentUser.profileCreated === false;
  const userLoggedIn = currentUser?._id === session?.user._id;
  
  const Navigation =()=> {
    const [open, setOpen] = React.useState<boolean>(false);

    const MainNavigationBar =():React.ReactElement=> {
      const SearchBar = () => {
        const [isFocused, setIsFocused] = React.useState<boolean>(false);
        return (
            <div className={`items-center flex w-full rounded gap-2 bg-[#f1f1f1] dark:dark:bg-inherit dark:text-white  dark:border h-full ${isFocused ? 'dark:border-tertiaryBlue' : 'dark:border-white'} `}>
            <div className='h-full w-[calc(100%_-_60px)]'>
              <input type="text" placeholder='search anything e.g posts, username etc..' className='lg:p-4 p-3 w-full h-full bg-inherit outline-none placeholder:lg:text-[14px] placeholder:md:text-[12px] dark:placeholder:text-white lg:text-[14px] md:text-[12px]' onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}/>
            </div>
            <button className={`rounded-r h-full ${isFocused ? 'bg-tertiaryBlue text-white' : ''}  flex justify-center items-center w-[60px]`}>
              <SearchIcon className='w-6 h-6'/>
            </button>
          </div>
        )
      }
      const HeaderLink = () => {
        return (
          <>
            <Link href={`/`} className="flex items-center md:gap-3 gap-5">
              <h2 className={`text-primary lg:text-2xl text-xl ${patrick.className}`}>Nomeogram</h2>
              <Bubble className='h-6 w-6 text-tertiaryBlue'/>
            </Link>
            <button className="md:hidden" onClick={()=>setOpen(!open)}>
              { open ? <CloseIcon className='h-6 w-6'/> : <MenuIcon className='h-6 w-6'/> }
            </button>
          </>
        )
      }
      const LoginIndicator = () => {
        return (
          <>
            <div className="md:flex gap-2 lg:gap-3 items-center hidden">
              <ImageAvatar size="extraSmall" profilePicture={session?.user?.profileImage?.url}/>
              <div className="text-gray-500 dark:text-white">
              <h2 className="lg:text-base text-sm">{session?.user?.username && '@'}{session?.user?.username}</h2>
            </div>
            </div>
            <button className="bg-tertiaryBlue lg:py-2 lg:px-3 p-2 text-white rounded text-sm lg:text-[15px] flex items-center gap-3" onClick={() => signOut()}>
              <h2>Logout</h2>
              <LogOut className='h-5 w-5'/>
            </button>
          </>
        )
      }
  
      return (
        <div className="fixed left-0 top-0 z-[300] bg-white w-full dark:bg-darkmode dark:text-white md:h-[60px] h-[50px] flex items-center dark:bg-[#3d3d3d] p-3 shadow-md">
          <div className="md:flex-row flex-row-reverse flex items-center lg:w-[17%] lg:px-4 justify-between md:w-[24%] w-full h-full md:gap-4">
            <div className='flex'>
              <ThemeToggler iconStyle='dark:text-white' className='border p-[5px] rounded shadow mr-3 md:mr-0'/>
              <div className='md:hidden'>
                <LoginIndicator/>
              </div>
            </div>
            <HeaderLink/>
          </div>
          <div className="hidden md:flex items-center lg:w-[61%] px-4 lg:px-6 justify-between md:w-[45%] h-full">
            <SearchBar/>
          </div>
          <div className="hidden md:flex items-center lg:w-[22%] justify-between lg:px-4 md:w-[33%] h-full">
            <LoginIndicator/>
          </div>
        </div>
      )
    }

    const MobileNavigationBar =():React.ReactElement=> {
      return(
        <AnimatePresence>
          <motion.div className="fixed left-0 top-0 w-full h-full bg-black/[0.4] md:hidden z-[200]"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            >
            <motion.div className="p-3 shadow-md rounded w-[50%] fixed top-[60px] left-[20px] dark:text-white dark:bg-[#3d3d3d] bg-[white]"
              initial={{x: '50%', opacity: 0}}
              animate={{x: '0%', opacity: 1}}
              exit={{x: '50%', opacity: 0}}
            >
              {mobileProfileNavigation}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )
    }

    return (
      <>
        <MainNavigationBar/>
        {open && <MobileNavigationBar/>}
      </>
    )
  }


  return (
    <div className={`w-full ${currentUser?.profileCreated === false ? ' h-screen overflow-hidden' : 'min-h-screen'}`}>
      { userLoggedIn && noProfile &&
        <div className='fixed left-0 top-0 w-full h-full bg-black/30 z-[500] flex items-center justify-center'>
          <div className='xl:w-[33%] md:w-[60%] w-[90%]'>
            <ProfileMultiStep getCurrentUser={getCurrentUser} setUserReady={setUserReady}/>
          </div>
        </div>
      }
      <Navigation/>
      <div className="flex lg:w-[84%] md:w-[88%] mx-auto md:h-[calc(100%_-_60px)] md:mt-[75px] mt-[60px]">
        <div className="lg:w-[27%] md:w-[40%] hidden md:block">
          <div className="fixed lg:w-[22.70%] md:w-[35.2%] md:h-[calc(100%_-_75px)]">
            {leftSection}
          </div>
        </div>
        <div className="lg:w-[45.5%] h-full px-3 md:w-[60%] w-[96%] mx-auto md:mx-0 relative z-50">
          {middleSection}
        </div>
        <div className="lg:w-[27%] hidden lg:block">
          <div className="fixed lg:w-[22.5%] md:h-[calc(100%_-_75px)]">
            {rightSection}
          </div> 
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout;
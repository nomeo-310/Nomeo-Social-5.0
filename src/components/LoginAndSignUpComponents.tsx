import React from 'react';
import Image from 'next/image';
import { Patrick_Hand_SC } from 'next/font/google';
import { EyeFilled, EyeFilledOff } from './IconPacks';
import localFont from 'next/font/local'

interface inputProps {
  title: string
  type: 'email' | 'password' | 'text'
  id: string
  placeholder: string
  value: string
  marginBottom?: boolean
  onChange: (event:React.ChangeEvent<HTMLInputElement>) => void
}

const patrick = localFont({src: '../../public/font/PatrickHandSC-Regular.woff2'})

interface textProps {
  headerText: string
  hashtags: string
  welcomeMessage: string
}

interface bannerProps {
  mobileSrc: string
  desktopSrc: string
}

const FormInputComponent = ({marginBottom, title, type, id, placeholder, value, onChange}: inputProps):React.ReactElement => {
  const [inputType, setInputType] = React.useState<string>('password');

  return (
    <div className={marginBottom ? 'lg:mb-3 mb-2' : ''}>
      <h2 className='text-white ml-2 mb-1 text-sm'>{title}</h2>
      <div className='relative'>
        {type === 'password' ?
          <input type={inputType} name="" id={id} className='text-sm outline-none focus:outline-none w-full lg:p-[10px] p-2 rounded' placeholder={placeholder} value={value} onChange={onChange} autoComplete='off'/> :
          <input type={type} name="" id={id} className='text-sm outline-none focus:outline-none w-full lg:p-[10px] p-2 rounded' placeholder={placeholder} value={value} onChange={onChange} autoComplete='off'/>
        }
        <div className={`absolute top-[9px] right-3 ${type === 'password' ? 'flex' : 'hidden'}`}>
          {inputType !== 'password' ? <EyeFilled className=' lg:w-6 w-5 lg:h-6 h-5 cursor-pointer' onClick={() => setInputType('password')}/> :
          <EyeFilledOff className='lg:w-6 w-5 lg:h-6 h-5 cursor-pointer' onClick={() => setInputType('text')}/> }
        </div>
      </div>
    </div>
  )
}

const TextContent = ({headerText, hashtags, welcomeMessage}:textProps):React.ReactElement => {
  return (
    <div className='mb-5 md:mb-8 text-white'>
      <h2 className={`md:text-4xl text-3xl ${patrick.className}`}>{headerText}</h2>
      <h2 className='md:text-xl text-base'>{hashtags}</h2>
      <p className='lg:text-lg md:text-base text-sm lg:mt-3 mt-4'>{welcomeMessage}</p>
    </div>
  )
}

const Banner = ({mobileSrc, desktopSrc}:bannerProps):React.ReactElement => {
  return (
    <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center'>
      <div className='absolute left-0 top-0 w-full h-full bg-black/20 z-[500]'/>
      <Image src={desktopSrc} alt="signupBanner" className='object-cover h-full w-full hidden md:block' fill />
      <Image src={mobileSrc} alt="signupBanner" className='object-cover h-full w-full md:hidden' fill />
    </div>
  )
}




export { FormInputComponent, TextContent, Banner}
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from 'react'
import { LongArrowRight } from '@/components/IconPacks';
import useInput from '@/hooks/useInput';
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link';
import { TextContent, FormInputComponent, Banner } from '@/components/LoginAndSignUpComponents';
import { testEmailInput, testPasswordInput } from '@/hooks/testValues';


export const createAccountText = {
  headerText: 'Welcome To Nomeogram',
  welcomeMessage: 'Welcome to our vibrant community, where connections thrive and stories unfold. Join us on this journey of shared moments, laughter, and discovery. Embrace the social heartbeat pulsating through every interaction. Together, let us create a tapestry of friendships that transcend borders. This is more than a platform; it is a celebration of you.',
  hashtags: '#ConnectCreateCelebrate',
  createAccount: 'Create Account',
  alreadyHaveAccount: 'Already have an account?',
  loginLink: '/loginUser',
  emailError: 'Invalid email address, check the value you typed.',
  passwordError: 'Your password should be atleast 8 characters with atleast one uppercase, special character and number.'
}

interface formProps {
  setDisplayAlert: React.Dispatch<React.SetStateAction<boolean>>
  setAlertType: React.Dispatch<React.SetStateAction<string>>
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>
}

const Form =({setAlertMessage, setDisplayAlert, setAlertType}:formProps):React.ReactElement => {
  const [isLoading, setIsLoading] = useState(false)
  const { email, password, onEmailChange, onPasswordChange, setEmail, setPassword, dataIsValid, setDataIsValid } = useInput('');

  const emailError = useInput('');
  const passwordError = useInput('');

  const testEmail = useMemo(() => testEmailInput(email), [email]);
  const testPassword = useMemo(() => testPasswordInput(password), [password]);

  useEffect(() => {
  if (testEmail) {
    emailError.setIsValid(true);
    emailError.setIsError(false)
  } else {
    emailError.setIsValid(false)
    emailError.setIsError(true)
    emailError.setErrorMessage(createAccountText.emailError)
  }
  }, [emailError, testEmail]);

  useEffect(() => {
  if (testPassword) {
    passwordError.setIsValid(true);
    passwordError.setIsError(false)
  } else {
    passwordError.setIsValid(false)
    passwordError.setIsError(true)
    passwordError.setErrorMessage(createAccountText.passwordError)
  }
  }, [passwordError, testPassword]);

  useEffect(() => {
  if (email !== '' && password !== "") {
    setDataIsValid(true)
  } else {
    setDataIsValid(false)
  }
  }, [email, password, setDataIsValid])

  const resetValues = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.navigator.onLine) {
      setIsLoading(true)
      try {
        await fetch('/api/createAccount', {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({email:email, password: password}),
        }).then((response) => {
          if (response.status === 200) {
            setDisplayAlert(true);
            setAlertType('success')
            setAlertMessage('You have successfully created an account')
          }
          if (response.status === 400) {
            setDisplayAlert(true);
            setAlertType('user')
            setAlertMessage('Email already used! User exists login')
            resetValues();
          }
        })
      } catch (error) {
        setDisplayAlert(true);
        setAlertType('error')
        setAlertMessage('Internal server error try again later!')
      }
    } else {
      setDisplayAlert(true)
      setAlertType('network');
      setAlertMessage('You are not online, check your internet');
    }
    setIsLoading(false)
  }
  return (
    <AnimatePresence>
      <motion.form className='lg:w-[45%] md:w-[60%] w-[90%] flex flex-col justify-center gap-2 lg:p-10 md:p-7 p-4 bg-black/40 rounded shadow-md' onSubmit={handleSubmit} initial={{x: '50%', opacity: 0}} animate={{x: '0%', opacity: 1}} exit={{x: '50%', opacity: 0}}>
        <TextContent headerText={createAccountText.headerText} hashtags={createAccountText.hashtags} welcomeMessage={createAccountText.welcomeMessage} />
        <div className='flex flex-col gap-3'>
          { email && emailError.isError && !emailError.isValid &&
            <div className='flex justify-end'>
              <p className='p-2 rounded bg-red-300 w-full text-sm lg:leading-[1.1]'>{emailError.errorMessage}</p>
            </div>
          }
          { password && passwordError.isError &&  !passwordError.isValid &&
            <div className='flex justify-end'>
              <p className='p-2 rounded bg-red-300 w-full text-sm lg:leading-[1.1]'>{passwordError.errorMessage}</p>
            </div>
          }
          <FormInputComponent 
            title={'Email Address'} 
            type={'email'} 
            id={'email'} 
            placeholder={'type your email address'} 
            value={email} 
            onChange={onEmailChange}
          />
          <FormInputComponent 
            title={'Password'} 
            type={'password'} 
            id={'password'} 
            placeholder={'type your password'} 
            value={password} 
            onChange={onPasswordChange}
          />
          <div className='text-white flex items-center justify-between'>
            <h2 className='text-sm lg:text-[15px] lg:leading-[1.1]'>{createAccountText.alreadyHaveAccount}</h2>
            <Link href={createAccountText.loginLink} className='lg:text-[15px] lg:leading-[1.1] text-sm flex gap-2 items-center'>
              Login
              <LongArrowRight className='w-6 h-6'/>
            </Link>
          </div>
          <div className='lg:mt-7 mt-8'>
            <button type="submit" className='bg-secondaryGreen text-white  p-2 lg:p-[10px] rounded md:w-[30%] w-[40%] text-sm lg:text-[15px] lg:leading-[1.1] disabled:bg-secondaryGreen/50' disabled={isLoading || !dataIsValid}>{isLoading ? 'Creating Account...': 'Create Account'}</button>
          </div>
        </div>
      </motion.form>
    </AnimatePresence>
  )
}

const ImageBanner = ():React.ReactElement => {
  return (
    <Banner mobileSrc={'/images/signupBanner_1.jpg'} desktopSrc={'/images/signupBanner_1a.jpg'}/>
  )
}



export { Form, ImageBanner}

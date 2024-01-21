/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useMemo, useState } from "react";
import { LongArrowRight } from "@/components/IconPacks"
import useInput from "@/hooks/useInput"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link';
import { TextContent, FormInputComponent, Banner } from '@/components/LoginAndSignUpComponents';
import { signIn } from "next-auth/react";
import { testEmailInput, testPasswordInput } from "@/hooks/testValues";


export const loginUserText = {
  headerText: 'Welcome Back',
  welcomeMessage: 'Welcome back, creating moments can be so much fun when it is done with the right set of people. Join us on this journey of shared moments, laughter, and discovery. Embrace the social heartbeat pulsating through every interaction. Nomeogram is more than just a social community but also a movement  that encourage connections and creativity.',
  hashtags: '#ConnectCreateCelebrate',
  login: 'Login ',
  doNotHaveAccount: 'Do not have an account?',
  createAccountLink: '/createAccount',
  createWithGoogle: 'Sign In with Google',
  createWithGitHub: 'Sign In With GitHub',
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
  const {  email, password, onEmailChange, onPasswordChange, setEmail, setPassword, dataIsValid, setDataIsValid } = useInput('');

  const emailError = useInput('')
  const passwordError = useInput('')

  const testEmail = useMemo(() => testEmailInput(email), [email]);
  const testPassword = useMemo(() => testPasswordInput(password), [password]);

  useEffect(() => {
    if (testEmail) {
      emailError.setIsValid(true);
      emailError.setIsError(false)
    } else {
      emailError.setIsValid(false)
      emailError.setIsError(true)
      emailError.setErrorMessage(loginUserText.emailError)
    }
    }, [emailError, testEmail]);
  
    useEffect(() => {
    if (testPassword) {
      passwordError.setIsValid(true);
      passwordError.setIsError(false)
    } else {
      passwordError.setIsValid(false)
      passwordError.setIsError(true)
      passwordError.setErrorMessage(loginUserText.passwordError)
    }
    }, [passwordError, testPassword]);

    useEffect(() => {
    if (email !== '' && password !== '') {
      setDataIsValid(true)
    } else {
      setDataIsValid(false)
    }
    }, [email, password, setDataIsValid])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.navigator.onLine) {
      setIsLoading(true)
      const response = await signIn("credentials", {redirect: false, email, password});
      if (response?.error === 'Error: Wrong password') {
        console.log(response.error)
        setDisplayAlert(true);
        setAlertType('user')
        setAlertMessage('Wrong password, type the correct password!')
        setPassword('')
      } else if (response?.error === 'Error: Wrong email') {
        setDisplayAlert(true);
        setAlertType('user')
        setAlertMessage('Wrong email address, type the correct email address!')
        setEmail('')
      } else if (response?.status === 500) {
        setDisplayAlert(true);
        setAlertType('network')
        setAlertMessage('Internal server error, try again later')
      } else {
        setDisplayAlert(true);
        setAlertType('success')
        setAlertMessage('You have successfully login')
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
      <motion.div className='lg:w-[45%] md:w-[60%] w-[90%] flex flex-col justify-center gap-2 lg:p-10 md:p-7 p-4 bg-black/40 rounded shadow-md' initial={{x: '50%', opacity: 0}} animate={{x: '0%', opacity: 1}} exit={{x: '50%', opacity: 0}}>
        <form action="" onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3'>
            <TextContent headerText={loginUserText.headerText} hashtags={loginUserText.hashtags} welcomeMessage={loginUserText.welcomeMessage} />
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
              <h2 className='text-sm lg:text-[15px] lg:leading-[1.1]'>{loginUserText.doNotHaveAccount}</h2>
              <Link href={loginUserText.createAccountLink} className='lg:text-[15px] lg:leading-[1.1] text-sm rounded flex gap-2 items-center'>
                Create an Account <LongArrowRight className='w-6 h-6'/>
              </Link>
            </div>
            <div className='lg:mt-7 mt-8'>
              <button type="submit" className='bg-primaryBlue text-white p-2 lg:p-[10px] rounded md:w-[30%] w-[40%] text-sm lg:text-[15px] lg:leading-[1.1] disabled:bg-primaryBlue/50' disabled={isLoading || !dataIsValid}>{isLoading ? 'Logging In...' : 'Login'}</button>
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

const ImageBanner = ():React.ReactElement => {
  return (
    <Banner mobileSrc={'/images/loginBanner_1.jpg'} desktopSrc={'/images/loginBanner_1a.jpg'}/>
  )
}


export { ImageBanner, Form}
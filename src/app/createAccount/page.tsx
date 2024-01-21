"use client"

import React from 'react'
import ThemeToggler from '@/components/ThemeToggler';
import { Form, ImageBanner } from './components/pageComponents';
import { Alert } from '@/components/Notifications';
import { useNotifications } from '@/hooks/useNotifications';
import { useRouter } from 'next/navigation';
import useStatus from '@/libs/useStatus';
import { FullScreenLoading } from '@/components/LoadingAnimation';

const CreateAccount = () => {
  const router = useRouter();
  const { alertMessage, displayAlert, setAlertMessage, setDisplayAlert, alertType, setAlertType} = useNotifications();
  const status = useStatus();
  
  const handleClick = () => {
    setDisplayAlert(false)
    router.replace('/loginUser')
  }

  return (
    <>
      {status === 'loading' ? <FullScreenLoading spinnerSize='90'/> :
      <div className="w-full h-screen items-center justify-center overflow-hidden flex">
        <ThemeToggler className='fixed top-3 left-3 z-[4000] p-1 rounded border border-white' iconStyle='text-white'/>
        <div className='relative w-full h-full overflow-hidden'>
          <ImageBanner/>
          <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center z-[900]'>
            <Form setDisplayAlert={setDisplayAlert} setAlertType={setAlertType} setAlertMessage={setAlertMessage} />
          </div>
        </div>
        { displayAlert && 
          <Alert 
            type={alertType} 
            message={alertMessage} 
            displayAlert={displayAlert} 
            onClick={alertType === 'success' ? () => handleClick() : () => setDisplayAlert(false)} 
          />
        }
      </div>}
    </>
  )
}

export default CreateAccount;

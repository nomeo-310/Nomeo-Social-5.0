import React from 'react'
import CardComponent from './CardComponent'
import { ArrowLeft, ArrowRight } from './IconPacks'
import { PageFour, PageOne, PageTwo, PageThree } from './ProfileMultiStepPages'
import { formProps } from '@/types/types'
import { useSession } from 'next-auth/react'
import { Alert } from './Notifications'
import { useNotifications } from '@/hooks/useNotifications'

type Props = {
  getCurrentUser: () => void
  setUserReady: React.Dispatch<React.SetStateAction<boolean>>
}

type controlProps = {
  style: string
  onClick: () => void
  buttonText: string
  loadingText: string
  icon: React.ReactNode
}

const ProfileMultiStep = ({getCurrentUser, setUserReady}: Props) => {

  const {data: session}:any = useSession();
  const [pageNumber, setPageNumber] = React.useState(1);

  const [formData, setFormData] = React.useState<formProps>({
    username: '',
    surname: '',
    lastname: '',
    gender: '',
    status: '',
    address: '',
    hobbies: [],
    otherSocialProfiles: [],
    profileCreated: false,
    occupation: '',
    birthday: '',
    birthdate: '',
    age: '',
    city: '',
    state: '',
    mobileNumber: '',
    bio: '',
    interests: []
  });
  
  const items = [1, 2, 3, 4];
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [validData, setValidData] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const { displayAlert, setDisplayAlert, alertMessage, alertType, setAlertType, setAlertMessage} = useNotifications();

  const Controls = () => {
    const ControlButton =({style, onClick, buttonText, icon}:Partial<controlProps>)=> {
      return (
        <span className={`shadow-md cursor-pointer w-fit h-full px-3 ${style} flex items-center justify-center rounded text-sm capitalize gap-2`} onClick={onClick}>
          {icon}
          <h2>{buttonText}</h2>
        </span>
      )
    }
    const SubmitButton = ({buttonText, loadingText, style}:Partial<controlProps>)=> {
      return (
        <button type="submit" className={`shadow-md cursor-pointer w-fit h-full px-3 flex items-center justify-center rounded text-sm capitalize gap-2 ${style}`}>
          {isLoading ? loadingText : buttonText}
          <ArrowRight className='w-5 h-5'/>
        </button>
      )
    }
    return (
      <div className="md:h-[40px] h-[35px] flex w-full justify-between items-center">
        { pageNumber > 1 && <ControlButton style='bg-white' buttonText='go back' icon={<ArrowLeft className='w-5 h-5'/>} onClick={() => setPageNumber((prev) => prev - 1)}/> }
        { pageNumber < 4 && <ControlButton style={`${validData ? 'bg-tertiaryBlue' : 'bg-secondaryRed'}  text-white flex-row-reverse`} buttonText='next step' icon={<ArrowRight className='w-5 h-5'/>} onClick={validData ? () => setPageNumber((prev) => prev + 1) : () => setError(!error) }/>}
        { pageNumber === 4 && validData && <SubmitButton style='bg-tertiaryGreen text-white' buttonText='create profile' loadingText='...creating profile'/> }
      </div>
    )
  }

  const handleCreateProfile = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    setIsLoading(true)
    try {
      await fetch(`/api/createProfile/${session?.user._id}`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      }).then((response) => {
        if (response.status === 200) {
          setSubmitSuccess(true)
          setDisplayAlert(true)
          setAlertMessage('You have successfully created your profile')
          setAlertType('success')
        } else {
          setSubmitSuccess(false)
          setDisplayAlert(true)
          setAlertMessage('Your profile was not created')
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
    setIsLoading(false)
  }
  
  return (
    <React.Fragment>
      <Alert 
        type={alertType} 
        message={alertMessage} 
        displayAlert={displayAlert} 
        onClick={submitSuccess ? () => {getCurrentUser(), setUserReady(true), setDisplayAlert(false)} : () => setDisplayAlert(false)}
      />
      <form className='flex flex-col' onSubmit={handleCreateProfile}>
        <CardComponent>
          <div className='md:min-h-[400px] min-h-[380px]'>
            { pageNumber <= items.length && 
              <div className='flex gap-4 p-3 items-center justify-center'>
                {items.map((i:number) => (
                <span key={`step_${i}`} className={`inline-block  ${i === pageNumber ? 'lg:w-12 w-10 bg-tertiaryBlue/80' : 'w-6 bg-gray-300'} rounded-full h-[6px]`}></span>
                ))}
              </div>
            }
            <div className='flex flex-col gap-3 lg:p-1 p-2 mt-10'>
              { error && !validData &&
                <div className='p-2 xl:p-[10px] w-full bg-red-200 rounded text-sm'>{errorMessage}</div>
              }
              <div className='grow'>
                { pageNumber === 1 && 
                  <PageOne 
                    formData={formData} 
                    setFormData={setFormData} 
                    setErrorMessage={setErrorMessage} 
                    setValidData={setValidData}
                  />
                }
                { pageNumber === 2 && 
                  <PageTwo
                    formData={formData} 
                    setFormData={setFormData} 
                    setErrorMessage={setErrorMessage} 
                    setValidData={setValidData} 
                  />
                }
                { pageNumber === 3 && 
                  <PageThree
                    formData={formData} 
                    setFormData={setFormData} 
                    setErrorMessage={setErrorMessage} 
                    setValidData={setValidData} 
                  />
                }
                { pageNumber === 4 && 
                  <PageFour 
                    formData={formData} 
                    setFormData={setFormData} 
                  />
                }
              </div>
            </div>
          </div>
        </CardComponent>
        <Controls/>
      </form>
    </React.Fragment>
  )
}

export default ProfileMultiStep
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from "react";
import useInput from "@/hooks/useInput";
import { RadioInputComponent, InputComponent, DateInputComponent, CustomSelectComponent, TextAreaComponent } from "./InputComponents";
import { CameraOutlined, CodeOutlined, DirectionOutlined, GamesOutlined, MovieOutlined, MusicOutlined, NFTOutlined, NewsOutlined, RestaurantOutlined, ShirtOutlined, ShoppingBagOutlined, WineGlassOutlined } from "./IconPacks";
import { formProps } from "@/types/types";
import { birthayGenerator } from "@/hooks/birthdayGenerator";
import { ageCalculator } from "@/hooks/ageCalculator";
import { testPhoneNumberInput } from "@/hooks/testValues";
import { allNigerianStates } from "../../public/data/allNigerianSAtate";

interface itemsProps {
  id: string
  checkedItem: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  icon: React.ReactNode
}

interface pageProps {
  formData: formProps
  setFormData: React.Dispatch<React.SetStateAction<formProps>>
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  setValidData: React.Dispatch<React.SetStateAction<boolean>>
}

interface partialPageProps {
  formData: formProps
  setFormData: React.Dispatch<React.SetStateAction<formProps>>
}

const PageOne = ({formData, setFormData, setErrorMessage, setValidData }:pageProps) => {
  const surname = useInput(formData.surname);
  const lastname = useInput(formData.lastname);
  const username = useInput(formData.username);
  const birthdate = useInput(formData.birthdate);

  const age = ageCalculator(birthdate.value) + ' years';
  const numericalAge = ageCalculator(birthdate.value);
  const birthday = birthayGenerator(birthdate.value)

  const handleSelectGender = (event: React.ChangeEvent<HTMLInputElement>)=> {
    const { value } = event.target
    setFormData({...formData, gender: value})
  }

  React.useEffect(() => {
  if (username.value) {
    setFormData({...formData, username: username.value})
  }
  }, [username.value, setFormData]);

  React.useEffect(() => {
    if (surname.value) {
      setFormData({...formData, surname: surname.value})
    }
    }, [surname.value, setFormData]);

  React.useEffect(() => {
    if (lastname.value) {
      setFormData({...formData, lastname: lastname.value})
    }
    }, [lastname.value, setFormData]);

  React.useEffect(() => {
    if (birthdate.value) {
      setFormData({...formData, birthdate: birthdate.value, age: age, birthday: birthday})
    }
    }, [birthdate.value, setFormData]);
  
  React.useEffect(() => {
    if (username.value === '' || surname.value === '' || lastname.value === '' || birthdate.value === '') {
      setValidData(false);
    } else {
      setValidData(true)
      setErrorMessage('')
    }
    }, [birthdate.value, lastname.value, setErrorMessage, setValidData, surname.value, username.value]);

  return (
    <div className=''>
    <div className='lg:mb-3 mb-2'>
      <h2 className='ml-2 mb-[3px] text-sm capitalize'>gender</h2>
      <div className='flex gap-3 items-center'>
        {['male', 'female', 'complicated'].map((g:string) => (
          <RadioInputComponent 
            name='gender' 
            value={g} 
            onChange={handleSelectGender} 
            checked={g === formData.gender} 
            key={g}
          />
        ))}
      </div>
    </div>
      <InputComponent 
        title={'surname'} 
        type={'text'} 
        id={'surname'} 
        placeholder={'enter your surname'} 
        value={surname.value} 
        onChange={surname.onValueChange}
        marginBottom
      />
      <InputComponent 
        title={'lastname'} 
        type={'text'} 
        id={'lastname'} 
        placeholder={'enter your lastname'} 
        value={lastname.value} 
        onChange={lastname.onValueChange}
        marginBottom
      />
      <InputComponent 
        title={'username'} 
        type={'text'} 
        id={'username'} 
        placeholder={'enter your username'} 
        value={username.value} 
        onChange={username.onValueChange}
        marginBottom
      />
      <DateInputComponent 
        title='date of birth'
        id='dateOfBirth'
        name='dateOfBirth'
        value={birthdate.value}
        onChange={birthdate.onValueChange}
      />
    </div>
  )
}

const PageTwo = ({ formData, setFormData, setErrorMessage, setValidData }:pageProps) => {
  const mobileNumber = useInput(formData.mobileNumber);
  const validMobileNumber = React.useMemo(() => testPhoneNumberInput(formData.mobileNumber), [formData.mobileNumber]);

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {interests} = formData;
    const { value , checked } = event.target;
    if ( checked ) {
      setFormData({...formData, interests: [...interests, value]})
    }else {
      setFormData({...formData, interests: interests.filter((m:string) => m !== value)}) 
    }
  }

  React.useEffect(() => {
    if (mobileNumber.value) {
      setFormData({...formData, mobileNumber: mobileNumber.value})
    }
    }, [mobileNumber.value, setFormData]);

  React.useEffect(() => {
    if (mobileNumber.value === '' || !validMobileNumber || formData.interests.length === 0) {
      setValidData(false)
      setErrorMessage(!validMobileNumber ? 'A vaid phone number should be 11 digits' : 'Add your phone number and pick at least one interest')
    } else {
      setValidData(true)
      setErrorMessage('')
    }
    }, [mobileNumber.value, setValidData, formData.interests.length, validMobileNumber]); 

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

  return (
    <div className=''>
      <InputComponent 
        title={'phone number'} 
        type={'text'} 
        id={'phonenumber'} 
        placeholder={'enter your phone number'} 
        value={mobileNumber.value} 
        onChange={mobileNumber.onValueChange}
        marginBottom
      />
      <div className=''>
        <h2 className='ml-2 mb-[3px] text-sm capitalize'>your interests</h2>
        <div className='w-full grid lg:grid-cols-4 grid-cols-3 gap-2'>
          {interesList.map((interest:any, index:number) => (
          <InterestItem 
            id={interest.id} 
            checkedItem={interest.name} 
            name='interests' 
            icon={interest.icon}
            onChange={handleClick}
            key={`interest_${index}`}
            checked={formData.interests.includes(interest.name)}
          />
          ))}
        </div>
      </div>
    </div>
  )
}

const PageThree = ({formData, setFormData, setErrorMessage, setValidData}:pageProps) => {
  const {selected, setSelected } = useInput(formData.state);
  const city = useInput(formData.city);
  const hobbies = useInput(formData.hobbies.join(','));
  const occupation = useInput(formData.occupation);
  const address = useInput(formData.address);

  const handleSelectStatus = (event: React.ChangeEvent<HTMLInputElement>)=> {
    const { value } = event.target
    setFormData({...formData, status: value})
  }
  
  React.useEffect(() => {
    if (selected) {
      setFormData({...formData, state: selected})
    }
    }, [selected, setFormData ]);

  React.useEffect(() => {
    if (city.value) {
      setFormData({...formData, city: city.value})
    }
    }, [city.value, setFormData ]);

  React.useEffect(() => {
    if (occupation.value) {
      setFormData({...formData, occupation: occupation.value})
    }
    }, [occupation.value, setFormData ]);

  React.useEffect(() => {
    if (address.value) {
      setFormData({...formData, address: address.value})
    }
    }, [address.value, setFormData ]);

  React.useEffect(() => {
    if (hobbies.value) {
      setFormData({...formData, hobbies: hobbies.value.split(',')})
    }
    }, [hobbies.value, setFormData ]);

  React.useEffect(() => {
    if (selected === '' || city.value === '' || address.value === '') {
      setValidData(false)
      setErrorMessage('Fill in details of your current location')
    } else {
      setValidData(true)
      setErrorMessage('')
    }
    }, [selected, city.value, address.value, setValidData, setErrorMessage]); 

  return (
    <div className=''>
      <div className='lg:mb-3 mb-2'>
        <h2 className='ml-2 mb-[3px] text-sm capitalize'>Status</h2>
        <div className='flex gap-3 items-center'>
          {['married', 'single', 'divorced', 'in relationship'].map((g:string) => (
            <RadioInputComponent 
              name='status' 
              value={g} 
              onChange={handleSelectStatus} 
              checked={g === formData.status} 
              key={g}
            />
          ))}
        </div>
      </div>
      <CustomSelectComponent 
        data={allNigerianStates}
        flowBottom
        placeholder='state'
        title='state'
        selected={selected}
        setSelected={setSelected}
        useSearchBar
        marginBottom
      />
      <InputComponent
        title={'city'} 
        type={'text'} 
        id={'city'} 
        placeholder={'which city are you dwelling?'} 
        value={city.value} 
        onChange={city.onValueChange}
        marginBottom
      />
      <InputComponent
        title={'address'} 
        type={'text'} 
        id={'address'} 
        placeholder={'where are you staying?'} 
        value={address.value} 
        onChange={address.onValueChange}
        marginBottom
      />
      <InputComponent
        title={'hobbies'} 
        type={'text'} 
        id={'hobbies'} 
        placeholder={'what are your hobbies? (place a comma after each)'} 
        value={hobbies.value} 
        onChange={hobbies.onValueChange}
        marginBottom
      />
      <InputComponent
        title={'occupation'} 
        type={'text'} 
        id={'occupation'} 
        placeholder={'what do you do for a living?'} 
        value={occupation.value} 
        onChange={occupation.onValueChange}
      />
    </div>
  )
}

const PageFour = ({formData, setFormData }:partialPageProps) => {
  const bio = useInput(formData.bio);
  const item_1 = useInput(formData.otherSocialProfiles[0]);
  const item_2 = useInput(formData.otherSocialProfiles[1]);
  const item_3 = useInput(formData.otherSocialProfiles[2]);
  const item_4 = useInput(formData.otherSocialProfiles[3]);

  React.useEffect(()=> {
    if (item_1.value || item_2.value || item_3.value || item_4.value) {
      const urls:string[] = Array.of(item_1.value, item_2.value, item_3.value, item_4.value)
      .filter((d) => d !== "").filter((d) => d !== undefined);
      setFormData({...formData, otherSocialProfiles: urls});
    }
  },[item_1.value, item_2.value, item_3.value, item_4.value, setFormData]);

  React.useEffect(() => {
    if (bio.value) {
      setFormData({...formData, bio: bio.value, profileCreated: true})
    }
    }, [bio.value, setFormData ]);

  return (
    <div className=''>
      <TextAreaComponent 
        title='bio'
        id='bio'
        placeholder='write something about yourself, possibly a quote you love'
        name='bio'
        marginBottom
        value={bio.value}
        onTextChange={bio.onTextAreaChange}
        maxHeight='lg:h-[170px] h-[190px]'
      />
      <div>
        <InputComponent
          title={'other social profiles (add as many)'} 
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
      </div>
    </div>
  )
}

export { PageOne, PageTwo, PageThree, PageFour }
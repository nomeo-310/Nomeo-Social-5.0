import Image from 'next/image';
import {ReactElement} from 'react';

interface avatarProps {
    size: 'small' | 'medium' | 'large' | 'extraLarge' | 'extraSmall' | 'extremelySmall'
    profilePicture:any
    circular?:boolean
}

const ImageAvatar = ({size, profilePicture, circular}:avatarProps):ReactElement => {
    const avatarSize =(size:string)=> {
        if (size === 'extremelySmall')  {
            return `relative w-[30px] h-[30px] md:w-[32px] md:h-[32px] flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'} shadow`
        }
        if (size === 'extraSmall')  {
            return `relative w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'} shadow`
        }
        if (size === 'small')  {
            return `relative w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'}  shadow`
        }
        if (size === 'medium')  {
            return `relative w-16 h-16 flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'}  shadow`
        }
        if (size === 'large')  {
            return `relative lg:w-24 lg:h-24 md:w-20 md:h-20 h-16 w-16 flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'}  shadow`
        }
        if (size === 'extraLarge')  {
            return `relative xl:w-28 xl:h-28 w-24 h-24 flex justify-center items-center overflow-hidden ${circular ? 'rounded-full': 'rounded'} shadow`
        }
    }

  return (
    <div className={avatarSize(size)}>
      { profilePicture ?
        <Image src={profilePicture} alt={`profile_picture`} fill className='w-full h-full'/>
      :
        <Image src='/images/default_user.png' alt='default_profile_picture' fill className='w-full h-full' />
      }
    </div>
  );
}

export default ImageAvatar;
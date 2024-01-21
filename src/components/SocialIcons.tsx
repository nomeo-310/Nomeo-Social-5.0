import React from 'react';
import { FacebookBold_F, InstagramOutlined, PinterestOutlined, YouTubeOutlined, LinkedInOutlined, TwitterOutlined } from './SocialMediaIcons';

type iconProps = {
    value:string
  }
const IconGenerator = ({value}:iconProps):React.ReactElement => {
  let icon:React.ReactNode = null;
  const style:string = 'w-6 h-6';

  if (value.split('/').includes('www.facebook.com')) {
      icon = <FacebookBold_F className={style}/>
  } 
  if (value.split('/').includes('www.instagram.com')) {
      icon = <InstagramOutlined className={style}/>
  } 
  if (value.split('/').includes('www.pinterest.com')) {
      icon = <PinterestOutlined className={style}/>
  } 
  if (value.split('/').includes('www.youtube.com')) {
      icon = <YouTubeOutlined className={style}/>
  }
  if (value.split('/').includes('www.linkedin.com')) {
      icon = <LinkedInOutlined className={style}/>
  }
  if (value.split('/').includes('www.twitter.com')) {
      icon = <TwitterOutlined className={style}/>
  }

  return (
    <a className={`${ value === '' ? 'hidden' : 'block'} border p-[3px] rounded text-tertiaryBlue shadow`} href={value} target='_blank' rel='noreferrer'>
      {icon}
    </a>
  );
}

export default IconGenerator;

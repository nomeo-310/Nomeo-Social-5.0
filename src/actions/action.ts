'use server'
import cloudinary from 'cloudinary'


const uploadProfileImage = async (formData: FormData) => {
  const file = formData.get('profileImage') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer)
  console.log(file)
  
}

const handleCreateCoverImage = async () => {
  console.log('create cover image')
}

export { uploadProfileImage, handleCreateCoverImage}
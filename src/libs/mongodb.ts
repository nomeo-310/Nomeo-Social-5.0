import mongoose, { ConnectOptions } from 'mongoose'

const MONGODB_URI=`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.p8bjwlm.mongodb.net/NomeoSocialApp?retryWrites=true&w=majority`;


const connectToDatabase = async ()  => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(MONGODB_URI)
    console.log('mongodb connection is successful')
  } catch (error) {
    throw new Error("Error connecting to mongodb")
  }
}

export default connectToDatabase;

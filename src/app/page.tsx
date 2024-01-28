"use client"

import React from "react";
import { FullScreenLoading } from "@/components/LoadingAnimation";
import MainLayout from "@/components/MainLayout";
import CardComponent from "@/components/CardComponent";
import ProfileCardComponent from "@/components/ProfileCardComponent";
import Feeds from "@/components/Feeds";
import withAuth from "@/utils/withAuth";
import { useSession } from "next-auth/react";
import UserList from "@/components/UserList";

const Home =() => {
  const {data: session}= useSession();
  const [allPosts, setAllPosts] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false)

  const UserProfile = () => {
    return (
      <CardComponent overflow>
        <ProfileCardComponent/>
      </CardComponent>
    )
  }

  const getAllPost = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/getPosts', {
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      });
      const data = await response.json();
      setAllPosts(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  React.useEffect(() => {
    if (session?.user) {
      getAllPost();
    }
  }, [session?.user])
  

  return (
    <React.Fragment>
      <MainLayout 
        leftSection={<UserProfile/>} 
        middleSection={ isLoading ? <FullScreenLoading spinnerSize="80" minHeight="lg:min-h-[590px] min-h-[600px]"/> : <Feeds data={allPosts}/>}
        rightSection={<UserList/>}
      />
    </React.Fragment>
  )
}

export default withAuth(Home);

"use client"

import React, { useEffect } from "react";
import useStatus from "@/libs/useStatus";
import { FullScreenLoading } from "@/components/LoadingAnimation";
import MainLayout from "@/components/MainLayout";
import CardComponent from "@/components/CardComponent";
import ProfileCardComponent from "@/components/ProfileCardComponent";
import Feeds from "@/components/Feeds";
import { testPost } from "@/components/SinglePost";
import withAuth from "@/utils/withAuth";
import { useSession } from "next-auth/react";
import UserList from "@/components/UserList";

const Home =() => {
  const status = useStatus();
  const {data: session}= useSession();


  
  
  const text:string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus saepe, asperiores dolores, totam itaque impedit eum, blanditiis eveniet iure expedita animi fugiat? Dignissimos laborum, voluptatibus velit at officia corrupti facere facilis ipsa ratione natus, quos neque. Quas ullam earum quaerat quidem placeat quasi consequuntur eius fugiat commodi minus ea in corporis libero quis obcaecati ex necessitatibus, alias repudiandae sed? Voluptate?';
  return (
    <>
    {status === 'loading' ? <FullScreenLoading spinnerSize='90'/>  :
      <MainLayout 
      leftSection={
        <>
          <CardComponent overflow>
            <ProfileCardComponent/>
          </CardComponent>
        </>
      } 
      middleSection={<Feeds data={testPost}/>}
      rightSection={
        <React.Fragment>
          <UserList/>
        </React.Fragment>
      }
      />
    }
    </>
  )
}

export default withAuth(Home);

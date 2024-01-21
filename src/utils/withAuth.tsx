'use client'

import { FullScreenLoading } from "@/components/LoadingAnimation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function withAuth (Component:any) {

  return function WithAuth (props:any) {
    const {status: sessionStatus} = useSession();
    const router = useRouter();

    const authorized = sessionStatus === 'authenticated'
    const unAuthorized = sessionStatus === 'unauthenticated';
    const loading = sessionStatus === 'loading'

    useEffect(() => {
      if (loading || !router) return;

      if (unAuthorized) {
        router.push('/loginUser')
      }
    }, [loading, router, sessionStatus, unAuthorized]);

    if (loading) {
      return <FullScreenLoading spinnerSize='80'/>
    }
  
    return authorized ? <Component {...props} /> : <></>
  }
}


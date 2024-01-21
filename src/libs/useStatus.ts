import { useSession } from "next-auth/react"

const useStatus =()=> {
  const session = useSession();

  const sessionStatus = session.status;
  return sessionStatus
}

export default useStatus
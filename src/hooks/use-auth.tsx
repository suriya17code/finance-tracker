'use client';
import  { useEffect, useState } from 'react'
import {getSession,login,SignUp,logout,User,getUsers}from "../lib/fakeAuthApi"
const useUser = () => {
  
    const [user,setUser]=useState<string>("")
    const [loading,setLoading]= useState<boolean>(false);
    const [error,setError]=useState<string|null>(null)
    const [userlist, setUserlist] = useState<User[]>([])
    useEffect(()=>{
        try {
           const data = getSession();
           const userlist= getUsers();
           setUser(data?.user?.email ??"")
           setUserlist(userlist)
        } catch (error) {
            setError(`failed to load session: ${error}`)
        }finally{
            setLoading(false)
        }
    },[])

  return {
      user,
      userlist,
      loading,
      error, 
      login,
      SignUp,
      logout: () => {
      logout();
      setUser("");
    },
    setUser
  }
}

export default useUser
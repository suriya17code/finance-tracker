'use client';
import React, { useEffect, useState } from 'react'
import {getSession,login,SignUp,logout,User}from "../lib/fakeAuthApi"
const useUser = () => {
  
    const [user,setUser]=useState<{ user: User; token: string }|null>(null)
    const [loading,setLoading]= useState<boolean>(false);
    const [error,setError]=useState<any>(null)

    useEffect(()=>{
        try {
           const data = getSession();
           setUser(data)
        } catch (error) {
            setError("failed to load session")
        }finally{
            setLoading(false)
        }
    },[])

  return {
      user,
      loading,
      error, 
      login,
      SignUp,
      logout: () => {
      logout();
      setUser(null);
    },
    setUser
  }
}

export default useUser
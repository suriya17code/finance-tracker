"use client";
import useUser from '@/hooks/use-auth';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

interface GuestGuardProps {
  children: React.ReactNode;
}

const GuestGuard = ({children}: GuestGuardProps) => {
    const [checking,setChecking]=useState(true)
    const {user,loading,error}=useUser();
    const router=useRouter()
    const checkPermissions = async () :Promise<void> => {
      
         if(loading) return
         if(error) return setChecking(false)
         if(user){
        router.replace("/dashboard")
         }
         setChecking(false)
    }
    useEffect(()=>{
      checkPermissions().catch(() => {
      // noop
    })
    },[user,loading,error])
    
      if(checking) return null;

       if(error) return <Alert color='error'>{error}</Alert>;

  return <>{children}</>
  
}

export default GuestGuard
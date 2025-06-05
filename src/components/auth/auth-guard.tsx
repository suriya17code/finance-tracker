// "use client";
// import useUser from '@/hooks/use-auth';
// import { Alert } from '@mui/material';
// import { useRouter } from 'next/navigation';

// import React, { useEffect, useState } from 'react'

// interface AuthGuardProps {
//   children: React.ReactNode;
// }

// const AuthGuard = ({children}: AuthGuardProps) => {

//     const [checking,setChecking]=useState(true)
//     const {user,loading,error}=useUser();
//     const router=useRouter() 

//      const userdata=sessionStorage.getItem("fake-user-data")
//     // const checkPermissions = async () :Promise<void> => {
//     //      if(loading) return
//     //      if(error) return setChecking(false)
//     //      if(!user){
//     //     router.replace("/login")
//     //      }
//     //      setChecking(false)
//     // }
//     useEffect(()=>{
//       // checkPermissions().catch(() => {})
//     if (!loading) {
//       if (error) {
//         setChecking(false);
//       } else if (!user && !userdata){
//         router.replace('/login');
//       } else {
//         setChecking(false);
//       }
//     }
//     },[user,loading,error])
//       if(checking) return null;
//        if(error) return <Alert color='success'>{error}</Alert>;
//   return <>{children}</>
// }
// export default AuthGuard;
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';
import useUser from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const [mounted, setMounted] = useState(false);
  const { user, loading, error } = useUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true); // Mark component as mounted (client-side)
    
    if (!loading && mounted) {
      const userdata = sessionStorage.getItem("fake-user-data");
      
      if (error) {
        console.error('Auth error:', error);
        setChecking(false);
        return;
      }
      
      // If neither auth system nor session storage has user data
      if (!user && !userdata) {
        console.log('No authentication found, redirecting...');
        router.replace('/login');
      } else {
        setChecking(false);
      }
    }
  }, [user, loading, error, router, mounted]);

  const [checking, setChecking] = useState(true);

  if (!mounted) return null; // Don't render on server
  if (checking) return null;
  if (error) return <Alert severity="error">{error}</Alert>;

  return <>{children}</>;
};

export default AuthGuard;
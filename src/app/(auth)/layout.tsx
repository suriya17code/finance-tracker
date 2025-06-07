"use client"; 
import GuestGuard from '@/components/auth/guards/guest-guard' 
import { Box, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react'

const Home = ({children}:Readonly<{ children: React.ReactNode}>) => {
  const Skeleton=()=>{
   return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
}
  return (
    <>
     <Suspense fallback={<Skeleton />}>
    <GuestGuard>
 {children} {/* 👈 This renders login/page.tsx inside here */}
 </GuestGuard>
 </Suspense>
    </>
  )
}

export default Home
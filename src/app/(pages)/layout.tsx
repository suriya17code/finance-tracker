"use client";
import AuthGuard from '@/components/auth/auth-guard'
import { Box, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react'

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

const Home = ({children}:Readonly<{ children: React.ReactNode}>) => {
  return (
    <>
    <Suspense fallback={<Skeleton />}>
    <AuthGuard>
 {children} {/* 👈 This renders dashboard/page.tsx inside here */}
 </AuthGuard>
 </Suspense>
    </>
  )
}

export default Home
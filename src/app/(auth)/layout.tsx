"use client"; 
import GuestGuard from '@/components/auth/guest-guard'
import React from 'react'

const Home = ({children}:Readonly<{ children: React.ReactNode}>) => {
  return (
    <>
    <GuestGuard>
 {children} {/* 👈 This renders dashboard/page.tsx inside here */}
 </GuestGuard>
    </>
  )
}

export default Home
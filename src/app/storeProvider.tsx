'use client';

import { Appstore, mokestore } from '@/store/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

type StoreProviderProps = {
  children: React.ReactNode;
};

const StoreProvider = ({children}:StoreProviderProps) => {
    
   const storeRef=useRef<Appstore|null>(null)

     if(!storeRef.current){
        storeRef.current=mokestore()
     }

  return <Provider store={storeRef.current}>{children}</Provider>

}

export default StoreProvider;
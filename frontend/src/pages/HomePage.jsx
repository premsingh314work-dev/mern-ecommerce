import React, { useEffect } from 'react'
import { useAuthStore } from '../stores/useAuthStore'

const HomePage = () => {
  const {authUser} = useAuthStore(); 
  useEffect(()=>{
    console.log(authUser);
  },[authUser])
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage
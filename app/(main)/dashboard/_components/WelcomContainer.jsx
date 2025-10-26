"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

export default function WelcomContainer() {
  const { user } = useUser();
  return (

    <div className='mt-6 mx-8 bg-card p-5 text-card-foreground rounded-xl flex justify-between items-center'>
      <div>
        <h2 className="text-lg font-bold">Welcome Back, {user?.name}</h2>
        <h2 className="text-muted-foreground">AI-Driven Interviews, Hassle-Free Hiring</h2>
      </div>
      {
        user && <Image src={user?.picture} alt="user" width={40} height={40} className='rounded-full'/>
      }
    </div>
  )
}

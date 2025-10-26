"use client"
import { Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-5'>
      <Link href={'/dashboard/create-interview'}
        className='bg-card rounded-xl p-5 border border-gray-100 cursor-pointer'
      >
        <Video className='p-3 text-primary bg-blue-400 rounded-lg h-12 w-12' />
        <h2 className='text-lg font-bold'>Create New Interview</h2>
        <p className='text-muted-foreground'>Create AI Interviews and Schedule them with Candidates</p>
      </Link>
      <div className='bg-card rounded-xl p-5 border border-gray-100 cursor-pointer'>
        <Phone className='p-3 text-primary bg-blue-400 rounded-lg h-12 w-12' />
        <h2 className='text-lg font-bold'>Create Phone Call Interview</h2>
        <p className='text-muted-foreground'>Schedule Phone Calls with Candidates</p>
      </div>
    </div>
  )
}

export default CreateOptions

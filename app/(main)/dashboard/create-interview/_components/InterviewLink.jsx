import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react'

function InterviewLink({interviewId, formData}) {
    const GetInterviewUrl=()=>{
        const url=process.env.NEXT
    }
  return (
    <div className='flex flex-col gap-2 items-center justify-center mt-10'>
        <Image src={'/tick.png'} 
            alt='tick' 
            width={200} 
            height={200} 
            className='w-[50px] h-[50px]'
        />
        <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
        <p className='text-muted-foreground'>Share this link with your candidates to start the interview process</p>
        <div className='w-full p-7 mt-6 rounded-xl bg-card'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold'>Interview Link</h2>
                <p className='text-sm ml-2 p-0.5 text-blue-500 bg-blue-200 rounded-4xl'> Valid for 30 days</p>
                <div>
                    <Input defaultValue={`https://interviews.ai/${interviewId}`} readOnly className='bg-card-foreground p-3 rounded-lg' />
                </div>
            </div>

        </div>
    </div>
  )
}

export default InterviewLink;
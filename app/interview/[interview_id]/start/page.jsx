"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Mic, Phone, Timer, Video } from 'lucide-react';
import Image from 'next/image';
import React, { useContext } from 'react'

function StartInterview() {
    const { InterviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    console.log(InterviewInfo);
    return (
        <div className='p-10 lg:px-48 xl:px-56'>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-accent-foreground">
                        {InterviewInfo?.InterviewData?.jobPosition || "AI"} Interview Session
                    </h1>
                    <p className="text-accent-foreground/50">
                        Powered by AI Interview Assistant
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <Timer className="text-blue-600" />
                    <span className="font-mono text-lg font-semibold text-gray-700">
                        {/* <TimmerComponent start={start} /> */}
                    </span>
                    <span className='flex gap-2 items-center'><Timer />00:00:00</span>

                </div>
            </header>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-card p-30 rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <Image
                        src="/AIR.jpeg"
                        alt="AI Recruiter"
                        width={300}
                        height={300}
                        className='w-[100px] h-[100px] rounded-full object-cover'
                    />
                    <h2 className='font-semibold'>AI Recruiter</h2>
                </div>
                <div className='bg-card p-30 rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <h2 className='flex items-center justify-center text-5xl font-semibold bg-primary text-accent rounded-full w-[100px] h-[100px]'>
                        {InterviewInfo?.userName ? InterviewInfo.userName[0].toUpperCase() : ''}
                    </h2>
                    <h2 className='font-semibold'>{InterviewInfo?.userName}</h2>
                </div>
            </div>
            <div className='flex justify-center items-center gap-10 mt-10'>
                <Mic className='h-12 w-12 p-3 bg-chart-2 rounded-full cursor-pointer' />
                <Phone className='h-12 w-12 p-3 bg-chart-1 rounded-full cursor-pointer' />
                <Video className='h-12 w-12 p-3 bg-chart-5 rounded-full cursor-pointer' />
            </div>
            <h2 className='text-sm text-center text-muted-foreground mt-7'>Interview in Progress....</h2>
        </div>
    )
}

export default StartInterview;

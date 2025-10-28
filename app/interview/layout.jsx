"use client"
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader';
import { Toaster } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';

function InterviewLayout({children}) {
  const [InterviewInfo, setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{InterviewInfo, setInterviewInfo}}>
    <div>
        <InterviewHeader />
      {children}
      <Toaster position="top-right" richColors />
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout;
"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';

export default function ScheduleInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    user && GetInterviewList()
  }, [user]);

  const GetInterviewList = async () => {
    const result = await supabase.from('Interviews')
      .select('jobPosition,jobDescription,interviewDuration,type,questionList,interview_id,interview-feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });

    console.log(result);
    setInterviewList(result?.data)

  }
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Interview List With Candidate Feedback</h2>
      {
        interviewList?.length == 0 &&
        <div className='p-5 flex flex-col gap-3 items-center'>
          <Video className='h-10 w-10 text-primary' />
          <h2>You Don't have any interviews created</h2>
          <Button>Create New Interview</Button>
        </div>
      }
      {
        interviewList?.length > 0 &&
        <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
          {interviewList?.map((interview, index) => (
            <InterviewCard key={index} interview={interview} viewDetails={true} />
          ))}
        </div>
      }
    </div>
  )
}

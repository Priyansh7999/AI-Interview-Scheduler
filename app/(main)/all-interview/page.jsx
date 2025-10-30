"use client"
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import InterviewCard from '../dashboard/_components/InterviewCard';
function AllInterviewList() {
    const [interviewList, setInterviewList] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        GetInterviewList();
    }, [user]);
    const GetInterviewList = async () => {
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false })
        console.log(Interviews);
        setInterviewList(Interviews);
    }
    return (
        <div className='my-5'>
            <h2 className='mt-7 font-bold text-2xl'>All Previously Created Interviews </h2>
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
                    {interviewList.map((interview, index) => (
                        <InterviewCard key={index} interview={interview} />
                    ))}           
                </div>
            }
        </div>
    )
}

export default AllInterviewList

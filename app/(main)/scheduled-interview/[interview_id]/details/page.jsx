"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import InterviewDetail from './_components/InterviewDetail';
import CandidateList from './_components/CandidateList';

function InterviewDetailContainer() {
    const { interview_id } = useParams();
    const {user} = useUser();
    const [interviewDetail, setInterviewDetail] = useState();
    useEffect(() => {
        GetInterviewDetail();
    }, [user]);

    const GetInterviewDetail = async () => {
        const result = await supabase.from('Interviews')
            .select(`jobPosition,jobDescription,interviewDuration,type,questionList,interview_id,created_at,interview-feedback(userEmail, userName, feedback, created_at)`)
            .eq('userEmail', user?.email)
            .eq('interview_id', interview_id)
            .order('id', { ascending: false });
        console.log(result);
        setInterviewDetail(result?.data[0])
    }
    return (
        <div>
            <h2 className='font-bold text-2xl'>Interview Detail</h2>
            <InterviewDetail interviewDetail={interviewDetail} />
            <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
        </div>
    )
}

export default InterviewDetailContainer
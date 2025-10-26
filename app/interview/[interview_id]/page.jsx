"use client"
import React, { useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'

function Interview() {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        interview_id && GetInterviewDeatils();
    }, [interview_id])
    const GetInterviewDeatils = async () => {
        setLoading(true);
        try {
            const { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,interviewDuration,type")
                .eq('interview_id', interview_id)
            setInterviewData(Interviews[0]);
            setLoading(false);
            if(Interviews?.length == 0){
                toast.error("Invalid Interview Link");
                return;
            }
        } catch (error) {
            console.log("Error fetching interview details:", error);
            toast.error("Error fetching interview details");
            setLoading(false);
        }


    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-16'>
            <div className='flex justify-center items-center flex-col bg-card border rounded-lg p-10 lg:px-36 shadow-muted-foreground/10 shadow-md mb-5 sm:mb-10 lg:mb-16'>
                <Image src={'/logo1.png'} alt='logo' width={400} height={100} className='w-[170px]' />
                <h2 className='text-muted-foreground mt-3'>AI-Powered Interview Plateform</h2>
                <p className="mt-2 text-gray-500">Next-generation hiring experience</p>

                <Image src={'/interview.jpeg'} alt='interview' width={400} height={400} className='w-full mt-5 rounded-lg' />
                <h2 className='font-semibold text-xl'>{interviewData?.jobPosition}</h2>
                <p className='flex gap-2 items-center text-muted-foreground mt-2'><Clock className='h-4 w-4' />{interviewData?.interviewDuration}</p>

                <div className='w-full'>
                    <h2>Enter Your Full Name</h2>
                    <Input type='text' placeholder='e.g. Priyansh Saxena' className='mt-2' />
                </div>

                <div className=" rounded-xl p-5 border mt-2 border-indigo-100">
                    <h2 className='font-semibold text-primary text-center mb-3 flex items-center justify-center gap-2'><Info className='text-pretty' />Before You begin</h2>
                    <ul className="space-y-3">
                        {[
                            'Provide a proper name & valid email address',
                            'Give access to your microphone',
                            'Ensure a stable internet connection',
                            'Enable camera permissions',
                            'Use Chrome or Edge browser',
                            'Find a quiet environment',
                            'Have your resume handy'
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button variant='default' className={"mt-5 w-full font-semibold"}><Video />Join Interview</Button>

            </div>
        </div>
    )
}

export default Interview

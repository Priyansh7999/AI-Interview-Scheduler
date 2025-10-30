"use client"
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interview() {
    const { interview_id } = useParams();
    const [interviewData, setInterviewData] = useState();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { InterviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    const router = useRouter();

    useEffect(() => {
        interview_id && GetInterviewDeatils();
    }, [interview_id])
    const GetInterviewDeatils = async () => {
        setLoading(true);
        try {
            const { data: Interviews, error } = await supabase
                .from('Interviews')
                .select("jobPosition,jobDescription,interviewDuration,type")
                .eq('interview_id', interview_id);

            console.log(Interviews);

            if (Interviews?.length === 0) {
                toast.error("Invalid Interview Link");
                setLoading(false);
                return;
            }

            setInterviewData(Interviews[0]);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching interview details:", error);
            toast.error("Error fetching interview details");
            setLoading(false);
        }
    };

    const onJoinInterview = async () => {
        setLoading(true);
        const { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id);
        console.log(Interviews);
        setInterviewInfo({
            userName,
            userEmail,
            InterviewData:Interviews[0],
        });
        router.push('/interview/' + interview_id + '/start');
        setLoading(false);
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
                    <Input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder='e.g. Priyansh Saxena'
                        className='mt-2' />
                    <h2 className='mt-4'>Enter Your Email</h2>
                    <Input
                        type='email'
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder='e.g. abc@gmail.com'
                        className='mt-2' />
                </div>

                <div className=" rounded-xl p-5 border mt-2 border-indigo-100">
                    <h2 className='font-semibold text-primary text-center mb-3 flex items-center justify-center gap-2'><Info className='text-pretty' />Before You begin</h2>
                    <ul className="space-y-3">
                        {[
                            'Provide a proper name & valid email address',
                            'Give access to your microphone',
                            'Ensure a stable internet connection',
                            'Find a quiet environment',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button
                    variant='default' disabled={loading || !userName || !userEmail}
                    onClick={() => onJoinInterview()}
                    className={"mt-5 w-full font-semibold"}>
                    <Video />
                    {loading && <Loader2Icon />}
                    Join Interview
                </Button>

            </div>
        </div>
    )
}

export default Interview

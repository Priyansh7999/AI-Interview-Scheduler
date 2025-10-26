import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

function InterviewLink({ interviewId, formData }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interviewId;

    const GetInterviewUrl = () => {
        return url;
    }
    const onCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        toast.success("Copied to clipboard");
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
            <div className='w-full p-7 mt-6 rounded-lg bg-card'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-semibold'>Interview Link</h2>
                    <p className='text-xs ml-2 p-1 text-blue-500 bg-blue-200 rounded-4xl'> Valid for 30 days</p>
                </div>
                <div className='mt-3 flex justify-between gap-3 items-center'>
                    <Input defaultValue={GetInterviewUrl()} readOnly className='bg-card-foreground p-3 rounded-lg' />
                    <Button onClick={() => onCopyLink()} variant='destructive'><Copy />Copy Link</Button>
                </div>
                <hr className='my-5' />
                <div className='flex gap-5 justify-between'>
                    <h2 className='text-sm text-muted-foreground flex gap-1.5 items-center'><Clock height={20} width={20} /> 30 min{formData?.interviewDuration}</h2>
                    <h2 className='text-sm text-muted-foreground flex gap-1.5 items-center'><List height={20} width={20} /> 10 Questions</h2>
                    {/* <h2 className='text-sm text-muted-foreground flex gap-1.5 items-center'><Calendar height={20} width={20} /> {formData?.interviewDuration}</h2> */}
                </div>
            </div>

            <div className='w-full p-7 mt-6 rounded-lg bg-card'>
                <h2 className='font-semibold'>Share Via</h2>
                <div className='flex gap-7 mt-5 justify-between'>
                    <Button variant={'outline'} className={"w-30"}><Mail /> Email</Button>
                    <Button variant={'outline'} className={"w-30"}><Mail /> Slack</Button>
                    <Button variant={'outline'} className={"w-30"}><Mail /> Whatsapp</Button>
                </div>
            </div>
            <div className='flex w-full gap-5 justify-between mt-6'>
                <Link href={'/dashboard'}>
                    <Button variant={'outline'}><ArrowLeft /> Back to Dashboard</Button>
                </Link>
                <Link href={'/dashboard/create-interview'}>
                    <Button><Plus /> Create Another Interview</Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewLink;
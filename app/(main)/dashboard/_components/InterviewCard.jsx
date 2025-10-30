import { Button } from '@/components/ui/button'
import { Copy, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({ interview }) {
    const copyLink = () => {
        const link = process.env.NEXT_PUBLIC_HOST_URL +'/'+ interview?.interview_id;
        navigator.clipboard.writeText(link);
        toast.success('Link Copied to Clipboard');
    }
    const onSend = () => {
        const link = process.env.NEXT_PUBLIC_HOST_URL +'/'+ interview?.interview_id;
        const mailtoLink = `mailto:?subject=Interview Link&body=Here is the link to the interview: ${link}`;
        window.location.href = mailtoLink;
    }
    return (
        <div className='p-5 bg-card rounded border'>
            <div className='flex items-center justify-between'>
                <div className="h-7 w-7 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                <h2 className='text-sm'>{moment(interview?.created_at).format('DD-MMM-YYYY')}</h2>
            </div>
            <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
            <h2 className='mt-2 font-light text-muted-foreground'>{interview?.interviewDuration}</h2>
            <div className="flex gap-3 mt-4 space-y-2">
                <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={copyLink}
                >
                    <Copy size={16} className="text-gray-600 dark:text-gray-300" />
                    <span>Copy Link</span>
                </Button>
                <Button
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={onSend}
                >
                    <Send size={16} className="text-blue-600" />
                    <span>Send</span>
                </Button>
            </div>
        </div>
    )
}

export default InterviewCard

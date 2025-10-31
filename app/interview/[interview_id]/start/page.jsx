"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState, useRef } from 'react'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import TimmerComponent from './_components/TimmerComponent';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

function StartInterview() {
    const { InterviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
    
    // Use useRef to maintain the same Vapi instance across renders
    const vapiRef = useRef(null);
    
    const [activeUser, setActiveUser] = useState(false);
    const [start, setStart] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [conversation, setConversation] = useState([]);
    const { interview_id } = useParams();
    const router = useRouter();
    
    // Use ref to prevent double submission
    const isSubmittingRef = useRef(false);

    // Initialize Vapi once
    useEffect(() => {
        if (!vapiRef.current) {
            vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
        }
    }, []);

    useEffect(() => {
        if (!InterviewInfo || !InterviewInfo?.InterviewData || !InterviewInfo?.userName || !InterviewInfo?.userEmail) {
            router.replace(`/interview/${interview_id}`);
        }
    }, []);

    useEffect(() => {
        if (InterviewInfo && vapiRef.current) {
            setStart(true);
            startCall();
        }
    }, [InterviewInfo]);

    useEffect(() => {
        if (!vapiRef.current) return;

        const vapi = vapiRef.current;

        const handleMessage = (message) => {
            console.log("New Message:", message);
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                setConversation(convoString);
            }
        };

        const handleCallStart = () => {
            console.log('Call started');
            toast.success("Interview Started Successfully");
            setIsConnected(true);
        };

        const handleSpeechStart = () => {
            console.log('Assistant started speaking');
            setActiveUser(false);
            setIsSpeaking(true);
        };

        const handleSpeechEnd = () => {
            console.log('Assistant stopped speaking');
            setActiveUser(true);
            setIsSpeaking(false);
        };

        const handleCallEnd = () => {
            console.log('Call ended');
            toast.success("Interview Ended Successfully");
            setIsConnected(false);
            setIsSpeaking(false);
            if (!isSubmittingRef.current) {
                isSubmittingRef.current = true;
                GenerateFeedback();
            }
        };

        vapi.on('message', handleMessage);
        vapi.on('call-start', handleCallStart);
        vapi.on('speech-start', handleSpeechStart);
        vapi.on('speech-end', handleSpeechEnd);
        vapi.on('call-end', handleCallEnd);
        return () => {
            vapi.off('message', handleMessage);
            vapi.off('call-start', handleCallStart);
            vapi.off('speech-start', handleSpeechStart);
            vapi.off('speech-end', handleSpeechEnd);
            vapi.off('call-end', handleCallEnd);
        };
    }, []);

    const startCall = () => {
        if (!vapiRef.current || !InterviewInfo) return;

        const questionList = InterviewInfo?.InterviewData?.questionList?.map(q => q?.question) || [];
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: `Hi ${InterviewInfo?.userName}, how are you? Ready for your interview on ${InterviewInfo?.InterviewData?.jobPosition}?`,
            transcriber: {
                provider: "deepgram",
                model: "nova-3",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey ${InterviewInfo?.userName}! Welcome to your ${InterviewInfo?.InterviewData?.jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After All questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
                    },
                ],
            },
        };
        
        try {
            vapiRef.current.start(assistantOptions);
        } catch (error) {
            console.error("Error starting call:", error);
            toast.error("Failed to start interview");
        }
    };

    const stopInterview = () => {
        if (loading || isSubmittingRef.current) {
            console.log("Already processing, ignoring stop request");
            return;
        }
        
        if (!vapiRef.current) {
            console.error("Vapi instance not found");
            toast.error("Failed to end interview");
            return;
        }
        
        try {
            console.log("Stopping interview...");
            vapiRef.current.stop();
            toast.info("Ending interview...");
        } catch (error) {
            console.error("Error stopping interview:", error);
            toast.error("Failed to end interview: " + error.message);
        }
    }

    const GenerateFeedback = async () => {
        setLoading(true);
        
        try {
            const result = await axios.post("/api/ai-feedback", { conversation });

            console.log("Feedback Result:", result?.data);
            const feedbackData = result?.data;

            console.log("Parsed Feedback:", feedbackData);
            const candidateResult = feedbackData?.feedback?.rating?.OverallRating;;
            const { data, error } = await supabase
                .from('interview-feedback')
                .insert([
                    {
                        userName: InterviewInfo?.userName,
                        userEmail: InterviewInfo?.userEmail,
                        interview_id: interview_id,
                        feedback: feedbackData.feedback || feedbackData,
                        recommended: candidateResult >= 7,
                    },
                ])
                .select();
                
            if (error) {
                console.error("Supabase Insert Error:", error);
                toast.error("Failed to save feedback");
                return;
            }
            
            console.log("Supabase Insert Success:", data);
            toast.success("Feedback saved successfully!");
            
            router.replace(`/interview/${interview_id}/completed`);
            
        } catch (error) {
            console.error("Feedback generation failed:", error);
            toast.error("Failed to generate feedback: " + error.message);
        } finally {
            setLoading(false);
            isSubmittingRef.current = false;
        }
    }

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
                <div className="flex items-center gap-4 bg-muted-foreground/90 px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <Timer className="text-blue-600" />
                    <span className="font-mono text-lg font-semibold text-gray-700">
                        <TimmerComponent start={start} />
                    </span>
                </div>
            </header>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
                <div className='bg-card p-30 rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {!activeUser && isConnected && <span className='absolute inset-0 rounded-full bg-accent-foreground/40 opacity-75 animate-ping'></span>}
                        <Image
                            src="/AIR.jpeg"
                            alt="AI Recruiter"
                            width={300}
                            height={300}
                            className='w-[100px] h-[100px] rounded-full object-cover'
                            priority
                        />
                    </div>
                    <h2 className='font-semibold'>AI Recruiter</h2>
                </div>

                <div className='bg-card p-30 rounded-lg border flex flex-col gap-3 items-center justify-center'>
                    <div className='relative'>
                        {activeUser && isConnected && <span className='absolute inset-0 rounded-full bg-accent-foreground/40 opacity-75 animate-ping'></span>}
                        <h2 className='flex items-center justify-center text-5xl font-semibold bg-primary text-accent rounded-full w-[100px] h-[100px]'>
                            {InterviewInfo?.userName ? InterviewInfo.userName[0].toUpperCase() : ''}
                        </h2>
                    </div>
                    <h2 className='font-semibold'>{InterviewInfo?.userName}</h2>
                </div>
            </div>

            <div className='flex justify-center items-center gap-10 mt-10'>
                <Mic className='h-12 w-12 p-3 bg-chart-2 rounded-full cursor-pointer' />

                <AlertConfirmation stopInterview={stopInterview}>
                    {loading ? (
                        <button
                            className="p-3 rounded-full bg-red-100 text-red-600 shadow-sm flex items-center gap-2 opacity-50 cursor-not-allowed"
                            disabled
                        >
                            <Loader2Icon className='animate-spin' size={20} />
                            <span>Processing...</span>
                        </button>
                    ) : (
                        <button
                            className="p-3 rounded-full bg-red-100 text-red-600 hover:bg-red-200 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                            aria-label="End call"
                        >
                            <Phone size={20} />
                            <span>End Interview</span>
                        </button>
                    )}
                </AlertConfirmation>
            </div>

            <h2 className='text-sm text-center text-muted-foreground mt-7'>
                {loading ? 'Generating Feedback...' : isConnected ? 'Interview in Progress....' : 'Connecting...'}
            </h2>
        </div>
    )
}

export default StartInterview;
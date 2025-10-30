import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from '@/components/ui/progress'
function CandidateFeedbackDialog({ candidate }) {
    const feedback = candidate?.feedback;
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View Report</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[70%]">
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-5'>
                            <div className='flex justify-between items-center'>
                                <div className="flex items-center gap-4">
                                    <h2 className="bg-primary text-black font-bold text-lg rounded-full w-12 h-12 flex items-center justify-center">
                                        {candidate?.userName?.[0]?.toUpperCase()}
                                    </h2>
                                    <div>
                                        <h2 className="font-semibold text-base">{candidate?.userName}</h2>
                                        <h2 className="text-sm text-muted-foreground">
                                            {candidate?.userEmail}
                                        </h2>
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center justify-between'>
                                    <h2 className='text-chart-2 text-2xl font-bold'>6/10</h2>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <h2 className='text-xl text-foreground font-bold'>Skills Assesment</h2>
                                <div className='mt-3 grid grid-cols-2 gap-10'>
                                    <div>
                                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.TechnicalSkills}/10</span></h2>
                                        <Progress value={feedback?.rating?.TechnicalSkills * 10} className={"mt-1"} />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Communication Skills <span>{feedback?.rating?.Communication}/10</span></h2>
                                        <Progress value={feedback?.rating?.Communication * 10} className={"mt-1"} />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.ProblemSolving}/10</span></h2>
                                        <Progress value={feedback?.rating?.ProblemSolving * 10} className={"mt-1"} />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Experience<span>{feedback?.rating?.Experience}/10</span></h2>
                                        <Progress value={feedback?.rating?.Experience * 10} className={"mt-1"} />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Behavioral <span>{feedback?.rating?.Behavioral}/10</span></h2>
                                        <Progress value={feedback?.rating?.Behavioral * 10} className={"mt-1"} />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Analysis<span>{feedback?.rating?.Analysis}/10</span></h2>
                                        <Progress value={feedback?.rating?.Analysis * 10} className={"mt-1"} />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-5'>
                                <h2 className='text-xl text-foreground font-bold'>Performance Summary</h2>
                                <p className='mt-2 bg-card p-5 rounded-xl'>{feedback?.summary}</p>
                            </div>

                            <div className={`mt-5 p-5 ${feedback?.Recommendation=="Not Recommended"?"bg-red-800":"bg-green-800"} rounded-xl`}>
                                <h2 className={`text-lg font-bold ${feedback?.Recommendation=="Not Recommended"?"text-green-300":"text-red-300"} rounded-xl`}>Recommendation Msg:</h2>
                                <p className='text-muted-foreground'>{feedback?.["Recommendation Message"]}</p>

                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Send Message</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog

"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({ onHandleInputChange, GoToNext }) {
    const [interviewType, setInterviewType] = useState([]);

    useEffect(() => {
        if (interviewType) onHandleInputChange("type", interviewType)
    }, [interviewType])

    const AddInterviewType = (name) => {
        const data = interviewType.includes(name);
        if (!data) setInterviewType(prev => [...prev, name])
        else {
            const result = interviewType.filter((item) => item != name);
            setInterviewType(result);
        }
    };

    return (
        <div className='p-5 bg-card rounded-xl'>
            <div className='mt-5'>
                <h2 className='text-lg font-medium'>Job Posotion</h2>
                <Input
                    placeholder='e.g. Software Engineer, Full Stack Developer' className={"mt-2"}
                    onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
                />
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium'>Job Description</h2>
                <Textarea
                    placeholder='Enter details of Job' className={"h-20 mt-2"}
                    onChange={(e) => onHandleInputChange("jobDescription", e.target.value)}

                />
            </div>
            <div className='mt-5'>
                <h2 className='text-lg font-medium mb-2'>Interview Duration</h2>
                <Select onValueChange={(value) => onHandleInputChange("interviewDuration", value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Duration</SelectLabel>
                            <SelectItem value="5 Min">5 Minutes</SelectItem>
                            <SelectItem value="15 Min">15 Minutes</SelectItem>
                            <SelectItem value="30 Min">30 Minutes</SelectItem>
                            <SelectItem value="45 Min">45 Minutes</SelectItem>
                            <SelectItem value="60 Min">60 Minutes</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-5'>
                <h2 className='text-lg font-medium'>Interview Type</h2>
                <div className='flex gap-2 mt-2 flex-wrap'>
                    {
                        InterviewType?.map((type, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex items-center cursor-pointer 
                                                gap-2 p-1 px-4 bg-card border border-gray-300 
                                                rounded-2xl hover:bg-secondary ${interviewType.includes(type.name) && "bg-sidebar-ring text-sidebar-primary"}`}
                                    onClick={() => AddInterviewType(type.name)}
                                >
                                    <type.icon className='h-4 w-4' />
                                    <span>{type.name}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
                <Button>Generate Question <ArrowRight /></Button>
            </div>
        </div>
    )
}

export default FormContainer

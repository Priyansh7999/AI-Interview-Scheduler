"use client"
import React, { useEffect } from 'react'
import Provider from './provider'
import { useUser } from '@/app/provider'
import { useRouter } from "next/navigation"
import { Toaster } from 'sonner'

export default function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.replace("/auth");
        }
    }, [user, router]);

    if (user === null) {
        return null;
    }

    return (
        <Provider>
            <div className='p-10'>
                {children}
            </div>
            <Toaster />
        </Provider>
    )
}
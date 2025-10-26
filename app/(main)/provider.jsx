import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import AppSidebar from './_components/AppSidebar'
import WelcomContainer from './dashboard/_components/WelcomContainer'

export default function Provider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full'>
                {/* <SidebarTrigger /> */}
                <WelcomContainer />
                {children}
            </div>
        </SidebarProvider>
    )
}

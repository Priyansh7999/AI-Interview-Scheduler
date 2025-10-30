"use client";
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { SideBarOptions } from '@/services/Constants'
import { LogOut, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Router } from 'next/router';
import React from 'react'

export default function AppSidebar() {
    const path = usePathname();
    const router = useRouter();
    const { user, setUser } = useUser();
    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Clear auth token
        router.push("/login"); // Redirect to login page
    };
    return (
        <Sidebar>
            <SidebarHeader className={'flex items-center mt-5'}>
                <Image src="/logo1.png" alt="Logo" width={200} height={100} className='w-[150px]' />
            </SidebarHeader>
            <div className="px-1.5">
                <Button
                    className="w-full cursor-pointer bg-blue-500 mt-2"
                    variant={"secondary"}
                    onClick={() => router.push("/dashboard/create-interview")}
                >
                    <Plus className="mr-2" />
                    Create New Interview
                </Button>
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            {SideBarOptions.map((option, index) => {
                                const isActive = path === option.path;
                                return (
                                    <SidebarMenuItem key={index} className="p-2">
                                        <SidebarMenuButton
                                            asChild
                                            className={`p-3 ${isActive ? "bg-blue-200 text-secondary" : "text-primary"} hover:bg-blue-100 hover:text-secondary`}
                                        >
                                            <Link href={option.path} className="flex items-center gap-3">
                                                <option.icon className={`w-5 h-5 ${isActive ? "text-secondary" : ""}`} />
                                                <span
                                                    className={`text-base font-medium ${isActive ? "text-secondary" : ""} `}
                                                >
                                                    {option.name}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className={'mb-5 px-1.5'}>
                <Button
                    className="w-full cursor-pointer text-center"
                    variant={"destructive"}
                    onClick={handleLogout}
                >
                    <LogOut className="mr-2" />
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}

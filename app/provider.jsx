"use client"
import { UserDetailsContext } from '@/context/UserDetailsContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react'

export const useUser = () => {
    const context = useContext(UserDetailsContext);
    return context;
}

function Provider({ children }) {
    const [user, setUser] = useState();

    useEffect(() => {
        CreateNewUser();
    }, [])

    const CreateNewUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        // Only proceed if user is authenticated
        if (!user) {
            setUser(null);
            return;
        }

        const { data: Users, error } = await supabase
            .from('Users')
            .select("*")
            .eq('email', user.email);

        // If not then create a new user
        if (Users && Users.length === 0) {
            const { data, error } = await supabase
                .from('Users')
                .insert([
                    {
                        name: user.user_metadata.name,
                        email: user.email,
                        picture: user.user_metadata.picture
                    }
                ])
                .select();
            setUser(data ? data[0] : null);
            return;
        }

        setUser(Users ? Users[0] : null);
    }

    return (
        <UserDetailsContext.Provider value={{user,setUser}}>
            {children}
        </UserDetailsContext.Provider>
    )
}

export default Provider;
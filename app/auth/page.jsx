"use client"
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import Image from 'next/image';
import React from 'react'

function Login() {

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      console.log('Error signing in with Google:', error.message);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b antialiased'>
            {/* fullscreen background image (fixed, behind content) */}
            <div className="fixed inset-0 -z-10 pointer-events-none select-none">
              <Image
                src="/bg.svg"
                alt="Background Pattern"
                width={600}
                height={100}
                className="w-full h-full object-fill rotate-90"
                priority
              />
            </div>
      <div className='flex flex-col items-center gap-4 border rounded-2xl p-6 '>
        <Image
          src={'/logo1.png'}
          alt='logo'
          width={400}
          height={100}
          className='w-[170px]'
        />
        <div className='flex flex-col items-center'>
          <Image
            src={'/login.webp'}
            alt='auth'
            width={400}
            height={400}
            className='w-[400px] h-[250px] rounded-2xl'
          />
          <h2 className='text-xl font-bold text-center mt-5'>Welcome To AI Interview Scheduler</h2>
          <p className='text-gray-500 text-center'>Sign In With Google</p>
          <Button className={'w-full mt-4'} onClick={signInWithGoogle}>Login With Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login;

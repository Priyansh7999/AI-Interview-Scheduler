import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-muted-foreground/10 shadow-md'>
      <Image src={'/logo1.png'} alt='logo' width={400} height={100} className='w-[170px]' />
    </div>
  )
}

export default InterviewHeader

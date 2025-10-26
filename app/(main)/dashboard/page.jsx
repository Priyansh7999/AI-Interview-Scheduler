import React from 'react'
import WelcomContainer from './_components/WelcomContainer'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'

export default function Dashboard() {
  return (
    <div>
      <h2 className='my-3 font-bold text-2xl'>Dashboard</h2>
      <CreateOptions />
      <LatestInterviewList />
    </div>
  )
}

import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog';
import exportToCSV from '@/lib/exportToCSV';

function CandidateList({ candidateList }) {
    console.log(candidateList);
    return (
        <div className='mt-5'>
            <div className='flex gap-5 justify-between items-center'>
                <h2 className='font-bold text-xl my-5'>Candidates ({candidateList?.length})</h2>
                <button
                    onClick={() => exportToCSV(candidateList)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Download CSV
                </button>
            </div>

            {
                candidateList?.map((candidate, index) => {
                    return (
                        <div
                            key={index}
                            className="px-5 py-3 flex justify-between items-center bg-card rounded-xl"
                        >
                            <div className="flex items-center gap-4">
                                <h2 className="bg-primary text-black font-bold text-lg rounded-full w-12 h-12 flex items-center justify-center">
                                    {candidate?.userName?.[0]?.toUpperCase()}
                                </h2>
                                <div>
                                    <h2 className="font-semibold text-base">{candidate?.userName}</h2>
                                    <h2 className="text-sm text-muted-foreground">
                                        Completed On: {moment(candidate?.created_at).format("DD-MMM-YYYY")}
                                    </h2>
                                </div>
                            </div>
                            <div className='flex gap-3 items-center justify-between'>
                                {/* <h2 className='text-chart-2'>{candidate?.feedback?.rating}</h2> */}
                                <CandidateFeedbackDialog candidate={candidate} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CandidateList
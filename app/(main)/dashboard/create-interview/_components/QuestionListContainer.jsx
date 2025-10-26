import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <>
      <h2 className='font-normal text-lg mb-5'>Generated Interview Questions:</h2>
      <div className="mt-5 flex flex-col gap-4 p-5 bg-card rounded-xl">
        {questionList.map((item, index) => (
          <div key={index} className="p-5 flex flex-col gap-2 border border-gray-700 rounded-xl">
            <h2 className="font-medium">{item.question}</h2>
            <p className="text-sm text-muted-foreground">Type: {item.type}</p>
          </div>
        ))}
      </div>

    </>
  )
}

export default QuestionListContainer

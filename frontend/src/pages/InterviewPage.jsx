import React from 'react'
import { useState } from 'react'
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3Report from '../components/Step3Report';

function InterviewPage() {
    const [step, setStep] = useState(1);
    const [interviewData, setInterviewData] = useState(null)
    return (
        <div className='min-h-screen bg-gray-50'>
            {step === 1 &&
                (<Step1 onStart={(data) => { setInterviewData(data);
                    setStep(2)
                 }} />
                )}
            {step === 2 &&
                (<Step2 interviewData={interviewData} 
                onFinish={(report)=>{setInterviewData(report);
                    setStep(2)
                }}/>
                )}

            {step === 3 &&
                (<Step3Report report={interviewData} />
                )}

        </div>
    )
}

export default InterviewPage

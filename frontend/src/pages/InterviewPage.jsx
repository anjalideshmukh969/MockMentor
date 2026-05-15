import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BsRobot } from 'react-icons/bs'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3Report from '../components/Step3Report'

const STEPS = [
    { label: 'Setup', number: 1 },
    { label: 'Interview', number: 2 },
    { label: 'Report', number: 3 },
]

function InterviewPage() {
    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null)

    return (
        <div className='min-h-screen relative' style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

            {/* Step progress bar — shown above interview steps */}
            {step <= 3 && (
                <div className='sticky top-0 z-50 flex justify-center pt-4 pb-2 px-4'
                    style={{ background: 'rgba(5,5,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(99,102,241,0.12)' }}>
                    <div className='flex items-center gap-3 sm:gap-6'>
                        {/* Logo */}
                        <div className='hidden sm:flex items-center gap-2 mr-4'>
                            <div className='p-2 rounded-xl' style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 14px rgba(99,102,241,0.4)' }}>
                                <BsRobot size={14} className='text-white' />
                            </div>
                            <span className='text-xs font-bold' style={{ color: 'rgba(255,255,255,0.5)' }}>MockMentor</span>
                        </div>

                        {STEPS.map((s, i) => (
                            <React.Fragment key={s.number}>
                                {/* Step node */}
                                <div className='flex items-center gap-2'>
                                    <motion.div
                                        animate={{
                                            scale: step === s.number ? [1, 1.08, 1] : 1,
                                        }}
                                        transition={{ duration: 1.5, repeat: step === s.number ? Infinity : 0 }}
                                        className='w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300'
                                        style={
                                            step > s.number
                                                ? { background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', boxShadow: '0 0 12px rgba(16,185,129,0.4)' }
                                                : step === s.number
                                                    ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', boxShadow: '0 0 16px rgba(99,102,241,0.5)' }
                                                    : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.1)' }
                                        }
                                    >
                                        {step > s.number ? '✓' : s.number}
                                    </motion.div>
                                    <span className='text-xs font-semibold hidden sm:block transition-all'
                                        style={{ color: step === s.number ? '#a5b4fc' : step > s.number ? '#10b981' : 'rgba(255,255,255,0.25)' }}>
                                        {s.label}
                                    </span>
                                </div>

                                {/* Connector line */}
                                {i < STEPS.length - 1 && (
                                    <div className='w-12 sm:w-20 h-px relative overflow-hidden' style={{ background: 'rgba(255,255,255,0.08)' }}>
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: step > s.number ? '100%' : '0%' }}
                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                            className='absolute top-0 left-0 h-full'
                                            style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            {/* Step content with slide transitions */}
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Step1 onStart={(data) => {
                            setInterviewData(data)
                            setStep(2)
                        }} />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Step2
                            interviewData={interviewData}
                            onFinish={(report) => {
                                setInterviewData(report)
                                setStep(3)
                            }}
                        />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Step3Report report={interviewData} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default InterviewPage
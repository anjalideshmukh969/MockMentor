import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { motion } from "motion/react"
import { BsRobot } from 'react-icons/bs'
import Step3Report from '../components/Step3Report'

function InterviewReport() {
    const { id } = useParams()
    const [report, setReport] = useState(null)

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/report/" + id, { withCredentials: true })
                setReport(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReport()
    }, [])

    if (!report) {
        return (
            <div className='min-h-screen flex items-center justify-center'
                style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

                {/* Grid */}
                <div className='fixed inset-0 pointer-events-none' style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
                    backgroundSize: '56px 56px',
                }} />

                <div className='flex flex-col items-center gap-8 relative z-10'>
                    {/* Outer spinning ring */}
                    <div className='relative w-28 h-28 flex items-center justify-center'>
                        {/* Ring 1 — slow */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className='absolute inset-0 rounded-full'
                            style={{ border: '2px solid transparent', borderTopColor: '#6366f1', borderRightColor: 'rgba(99,102,241,0.3)' }}
                        />
                        {/* Ring 2 — fast reverse */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                            className='absolute inset-3 rounded-full'
                            style={{ border: '2px solid transparent', borderTopColor: '#8b5cf6', borderLeftColor: 'rgba(139,92,246,0.3)' }}
                        />
                        {/* Pulsing glow */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className='absolute inset-0 rounded-full'
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)' }}
                        />
                        {/* Robot icon center */}
                        <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className='p-3 rounded-xl text-white relative z-10'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 0 20px rgba(99,102,241,0.5)',
                            }}
                        >
                            <BsRobot size={22} />
                        </motion.div>
                    </div>

                    <div className='text-center'>
                        <p className='font-semibold text-base' style={{ color: 'rgba(255,255,255,0.7)' }}>
                            Generating your report...
                        </p>
                        <p className='text-sm mt-1' style={{ color: 'rgba(255,255,255,0.3)' }}>
                            AI is analyzing your performance
                        </p>
                    </div>

                    {/* Pulsing dots */}
                    <div className='flex gap-2'>
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.6, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className='w-2 h-2 rounded-full'
                                style={{ background: '#6366f1' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return <Step3Report report={report} />
}

export default InterviewReport
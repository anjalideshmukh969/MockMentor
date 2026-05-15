import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../config/config'
import { motion } from "motion/react"
import { FaArrowLeft, FaCalendarAlt, FaChartLine, FaClock, FaStar } from 'react-icons/fa'
import { BsRobot, BsLightningCharge } from "react-icons/bs"

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    const getScoreStyle = (score) => {
        if (score >= 8) return { color: '#10b981', bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', glow: 'rgba(16,185,129,0.25)' }
        if (score >= 5) return { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', glow: 'rgba(245,158,11,0.2)' }
        return { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', glow: 'rgba(239,68,68,0.2)' }
    }

    return (
        <div className='min-h-screen py-10 px-4 relative overflow-hidden'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

            {/* Grid pattern */}
            <div className='fixed inset-0 pointer-events-none' style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
                backgroundSize: '56px 56px',
            }} />

            {/* Ambient orbs */}
            <div className='fixed top-[-100px] left-[-100px] w-72 h-72 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className='fixed bottom-[-100px] right-[-100px] w-72 h-72 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div className='w-[95vw] lg:w-[75vw] max-w-[1400px] mx-auto relative z-10'>

                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='mb-12 flex flex-wrap items-center justify-between gap-6'
                >
                    <div className='flex items-start gap-4'>
                        <motion.button
                            whileHover={{ scale: 1.08, x: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className='mt-1 p-4 rounded-2xl transition-all'
                            style={{
                                background: 'rgba(99,102,241,0.1)',
                                border: '1px solid rgba(99,102,241,0.25)',
                                color: '#818cf8',
                            }}
                        >
                            <FaArrowLeft className='text-lg' />
                        </motion.button>

                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity }}
                                    className='p-3 rounded-2xl text-white'
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                                    }}
                                >
                                    <BsRobot size={20} />
                                </motion.div>
                                <h1 className='text-4xl md:text-5xl font-bold' style={{ color: '#fff', letterSpacing: '-0.5px' }}>
                                    Interview History
                                </h1>
                            </div>
                            <p className='text-lg' style={{ color: 'rgba(255,255,255,0.4)' }}>
                                Track your AI interview performance, reports and growth journey.
                            </p>
                        </div>
                    </div>

                    {/* Stats pill */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex items-center gap-8 px-7 py-5 rounded-3xl'
                        style={{
                            background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                            border: '1px solid rgba(99,102,241,0.22)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                        }} />
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold' style={{
                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                {interviews.length}
                            </h3>
                            <p className='text-sm' style={{ color: 'rgba(255,255,255,0.35)' }}>Interviews</p>
                        </div>
                        <div className='w-px h-12' style={{ background: 'rgba(255,255,255,0.07)' }} />
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold' style={{
                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                {interviews.length > 0
                                    ? (interviews.reduce((acc, item) => acc + (item.finalScore || 0), 0) / interviews.length).toFixed(1)
                                    : 0}
                            </h3>
                            <p className='text-sm' style={{ color: 'rgba(255,255,255,0.35)' }}>Avg Score</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* EMPTY STATE */}
                {interviews.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='p-16 text-center relative overflow-hidden'
                        style={{
                            background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '32px',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(139,92,246,0.8), rgba(99,102,241,0.7), transparent)',
                        }} />

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className='w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 0 40px rgba(99,102,241,0.5)',
                            }}
                        >
                            <BsLightningCharge className='text-4xl' />
                        </motion.div>

                        <h2 className='text-2xl font-bold mb-3' style={{ color: '#fff' }}>No Interviews Found</h2>
                        <p className='mb-8' style={{ color: 'rgba(255,255,255,0.4)' }}>
                            Start your first AI interview and track your growth journey.
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/")}
                            className='px-8 py-3 rounded-2xl font-semibold text-white'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                            }}
                        >
                            Start Interview
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className='grid gap-6'>
                        {interviews.map((item, index) => {
                            const sc = getScoreStyle(item.finalScore || 0)
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.07 }}
                                    whileHover={{ y: -4, scale: 1.01 }}
                                    onClick={() => navigate(`/report/${item._id}`)}
                                    className='relative overflow-hidden p-7 cursor-pointer transition-all duration-300'
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                                        border: '1px solid rgba(99,102,241,0.18)',
                                        borderRadius: '28px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = `${sc.border}`
                                        e.currentTarget.style.boxShadow = `0 0 32px ${sc.glow}, 0 16px 48px rgba(0,0,0,0.6)`
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {/* Top glow line colored by score */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                                        background: `linear-gradient(90deg, transparent, ${sc.color}80, transparent)`,
                                    }} />

                                    {/* Ambient corner glow */}
                                    <div className='absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none'
                                        style={{ background: `radial-gradient(circle, ${sc.color}10 0%, transparent 70%)`, filter: 'blur(30px)' }} />

                                    <div className='relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7'>
                                        {/* LEFT */}
                                        <div>
                                            <div className='flex items-center gap-3 mb-3'>
                                                <div className='p-3 rounded-2xl text-white'
                                                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 14px rgba(99,102,241,0.3)' }}>
                                                    <FaChartLine />
                                                </div>
                                                <h3 className='text-2xl font-bold' style={{ color: '#fff' }}>{item.role}</h3>
                                            </div>

                                            <div className='flex flex-wrap items-center gap-4 text-sm mb-4'>
                                                <span className='flex items-center gap-2' style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                    <FaStar style={{ color: '#818cf8' }} />
                                                    {item.experience}
                                                </span>
                                                <span className='flex items-center gap-2' style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                    <BsRobot style={{ color: '#818cf8' }} />
                                                    {item.mode}
                                                </span>
                                                <span className='flex items-center gap-2' style={{ color: 'rgba(255,255,255,0.45)' }}>
                                                    <FaCalendarAlt style={{ color: '#818cf8' }} />
                                                    {new Date(item.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <p className='leading-relaxed max-w-2xl text-sm' style={{ color: 'rgba(255,255,255,0.35)' }}>
                                                AI-powered interview session with smart evaluation, adaptive questioning and detailed performance analysis.
                                            </p>
                                        </div>

                                        {/* RIGHT */}
                                        <div className='flex items-center gap-5 flex-wrap'>
                                            {/* Score card */}
                                            <motion.div
                                                whileHover={{ scale: 1.06 }}
                                                className='rounded-3xl px-7 py-5 text-center min-w-[120px] relative overflow-hidden'
                                                style={{
                                                    background: sc.bg,
                                                    border: `1px solid ${sc.border}`,
                                                    boxShadow: `0 0 20px ${sc.glow}`,
                                                }}
                                            >
                                                <h2 className='text-3xl font-black' style={{ color: sc.color }}>
                                                    {item.finalScore || 0}/10
                                                </h2>
                                                <p className='text-xs mt-1' style={{ color: `${sc.color}cc` }}>Overall Score</p>
                                            </motion.div>

                                            {/* Status */}
                                            <div className='flex flex-col gap-3'>
                                                <span className='px-5 py-2 rounded-full text-sm font-medium text-center'
                                                    style={item.status === "completed"
                                                        ? { background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }
                                                        : { background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }
                                                    }>
                                                    {item.status}
                                                </span>
                                                <div className='flex items-center gap-2 text-sm' style={{ color: 'rgba(255,255,255,0.3)' }}>
                                                    <FaClock />
                                                    AI Generated Report
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory
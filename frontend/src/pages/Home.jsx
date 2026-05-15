import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react"
import {
    BsRobot, BsMic, BsClock, BsBarChart,
    BsFileEarmarkText, BsStars, BsLightningCharge, BsShieldCheck
} from "react-icons/bs"
import { HiSparkles, HiMiniCpuChip } from "react-icons/hi2"
import { FaBrain, FaMicrophoneAlt, FaChartLine, FaRocket } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import AuthModel from '../components/AuthModel'
import hrImg from "../assets/HR.png"
import techImg from "../assets/tech.png"
import confidenceImg from "../assets/confi.png"
import creditImg from "../assets/credit.png"
import evalImg from "../assets/ai-ans.png"
import resumeImg from "../assets/resume.png"
import pdfImg from "../assets/pdf.png"
import analyticsImg from "../assets/history.png"
import Footer from '../components/Footer'

function Home() {
    const { userData } = useSelector((state) => state.user)
    const [showAuth, setShowAuth] = useState(false)
    const navigate = useNavigate()

    const cardStyle = {
        background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
        border: '1px solid rgba(99,102,241,0.18)',
        borderRadius: '28px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }

    return (
        <div className='min-h-screen flex flex-col overflow-hidden relative'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #080818 60%, #05050f 100%)' }}>

            {/* Grid pattern */}
            <div className='fixed inset-0 pointer-events-none' style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
                backgroundSize: '56px 56px',
            }} />

            {/* Ambient orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
                transition={{ duration: 8, repeat: Infinity }}
                className='fixed top-[-100px] left-[-100px] w-[380px] h-[380px] rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(70px)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 10, repeat: Infinity }}
                className='fixed bottom-[-100px] right-[-100px] w-[420px] h-[420px] rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(70px)' }}
            />

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -22, 0], opacity: [0.15, 0.5, 0.15] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
                    className='fixed w-1.5 h-1.5 rounded-full pointer-events-none'
                    style={{
                        background: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
                        top: `${5 + (i * 6.5) % 90}%`,
                        left: `${3 + (i * 7.1) % 94}%`,
                        opacity: 0.18,
                    }}
                />
            ))}

            <Navbar />

            <div className='flex-1 px-6 py-20 relative z-10'>
                <div className='max-w-7xl mx-auto'>

                    {/* TOP BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='flex justify-center mb-10'
                    >
                        <div className='flex items-center gap-3 px-5 py-2.5 rounded-full'
                            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)' }}>
                            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                                <HiSparkles style={{ color: '#818cf8', fontSize: '18px' }} />
                            </motion.div>
                            <span className='font-medium text-sm md:text-base' style={{ color: 'rgba(255,255,255,0.7)' }}>
                                AI Powered Smart Interview Platform
                            </span>
                        </div>
                    </motion.div>

                    {/* HERO */}
                    <div className='text-center mb-32 relative'>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7 }}
                            className='inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 text-sm font-semibold'
                            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', color: '#a5b4fc' }}
                        >
                            <HiMiniCpuChip />
                            AI Engine Active
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className='font-black leading-tight max-w-5xl mx-auto'
                            style={{
                                fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                                color: '#fff',
                                letterSpacing: '-1px',
                                lineHeight: 1.08,
                            }}
                        >
                            Crack Interviews with{" "}
                            <span className='relative inline-block'>
                                <span style={{
                                    background: 'linear-gradient(135deg, #818cf8, #a78bfa, #c4b5fd)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    AI Intelligence
                                </span>
                                <motion.div
                                    animate={{ width: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className='absolute bottom-0 left-0 h-1.5 rounded-full'
                                    style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className='mt-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed'
                            style={{ color: 'rgba(255,255,255,0.45)' }}
                        >
                            Experience next-generation AI interviews with adaptive questioning,
                            voice analysis, resume intelligence, confidence tracking,
                            and real-time performance evaluation.
                        </motion.p>

                        {/* CTA Buttons */}
                        <div className='flex flex-wrap justify-center gap-5 mt-12'>
                            <motion.button
                                onClick={() => { if (!userData) { setShowAuth(true); return } navigate("/interview") }}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.96 }}
                                className='relative overflow-hidden px-10 py-4 rounded-full font-bold text-white'
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    boxShadow: '0 6px 28px rgba(99,102,241,0.45)',
                                    fontSize: '15px',
                                }}
                            >
                                <motion.div
                                    animate={{ x: ['-100%', '250%'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                    className='absolute inset-0 skew-x-12 w-1/3'
                                    style={{ background: 'rgba(255,255,255,0.18)' }}
                                />
                                <span className='relative z-10 flex items-center gap-2'>
                                    <FaRocket />
                                    Start AI Interview
                                </span>
                            </motion.button>

                            <motion.button
                                onClick={() => { if (!userData) { setShowAuth(true); return } navigate("/history") }}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className='px-10 py-4 rounded-full font-semibold transition-all'
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(99,102,241,0.3)',
                                    color: 'rgba(255,255,255,0.75)',
                                    fontSize: '15px',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
                                    e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                }}
                            >
                                View Analytics
                            </motion.button>
                        </div>

                        {/* Floating stat cards */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-16 max-w-5xl mx-auto'>
                            {[
                                { value: "10K+", label: "AI Questions" },
                                { value: "95%", label: "Accuracy" },
                                { value: "24/7", label: "AI Support" },
                                { value: "5+", label: "Interview Modes" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.03 }}
                                    className='p-6 rounded-3xl relative overflow-hidden'
                                    style={cardStyle}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'}
                                >
                                    <div style={{
                                        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                                    }} />
                                    <h2 className='text-3xl font-black' style={{
                                        background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    }}>
                                        {item.value}
                                    </h2>
                                    <p className='text-sm mt-2' style={{ color: 'rgba(255,255,255,0.35)' }}>
                                        {item.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* PROCESS SECTION */}
                    <div className='flex flex-col md:flex-row justify-center items-center gap-10 mb-32'>
                        {[
                            { icon: <BsRobot size={24} />, step: "STEP 1", title: "Role & Experience Selection", desc: "AI dynamically adjusts interview difficulty based on role and experience." },
                            { icon: <BsMic size={24} />, step: "STEP 2", title: "Real-Time Voice Interview", desc: "Adaptive follow-up questions with AI-powered interaction." },
                            { icon: <BsClock size={24} />, step: "STEP 3", title: "Smart Evaluation Report", desc: "Detailed analytics, confidence score and improvement feedback." },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: index * 0.2 }}
                                whileHover={{ scale: 1.04, rotate: 0 }}
                                className={`relative p-10 w-80 max-w-[90%] transition-all duration-300 overflow-hidden
                                    ${index === 0 ? "rotate-[-4deg]" : ""}
                                    ${index === 1 ? "rotate-[3deg] md:-mt-8" : ""}
                                    ${index === 2 ? "rotate-[-3deg]" : ""}
                                `}
                                style={{
                                    ...cardStyle,
                                    borderRadius: '32px',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.42)'
                                    e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.12), 0 20px 60px rgba(0,0,0,0.6)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                                }} />
                                <motion.div
                                    animate={{ y: [0, -7, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    className='absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl'
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        boxShadow: '0 0 24px rgba(99,102,241,0.5)',
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                                <div className='pt-10 text-center'>
                                    <div className='text-xs font-bold tracking-widest mb-3' style={{ color: '#818cf8' }}>{item.step}</div>
                                    <h3 className='font-bold mb-4 text-xl' style={{ color: '#fff' }}>{item.title}</h3>
                                    <p className='text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI CAPABILITIES */}
                    <div className='mb-32'>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className='font-black text-center mb-20'
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', letterSpacing: '-0.5px' }}
                        >
                            Advanced AI{" "}
                            <span style={{
                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                Capabilities
                            </span>
                        </motion.h2>

                        <div className='grid md:grid-cols-2 gap-8'>
                            {[
                                { image: evalImg, icon: <BsBarChart size={20} />, title: "AI Answer Evaluation", desc: "Analyze technical accuracy, communication and confidence in real-time." },
                                { image: resumeImg, icon: <BsFileEarmarkText size={20} />, title: "Resume Intelligence", desc: "AI generates personalized questions from your projects and skills." },
                                { image: pdfImg, icon: <BsShieldCheck size={20} />, title: "Professional PDF Reports", desc: "Download detailed interview analytics and improvement roadmap." },
                                { image: analyticsImg, icon: <BsLightningCharge size={20} />, title: "Live Performance Analytics", desc: "Track growth trends, strengths, weaknesses and interview history." },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.02 }}
                                    className='group p-8 transition-all duration-300 overflow-hidden relative'
                                    style={cardStyle}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.1), 0 20px 60px rgba(0,0,0,0.6)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {/* Top glow line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                                    }} />
                                    {/* Shimmer sweep */}
                                    <motion.div
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                        className='absolute inset-0'
                                        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.04), transparent)' }}
                                    />

                                    <div className='flex flex-col md:flex-row items-center gap-8 relative z-10'>
                                        <motion.div whileHover={{ rotate: 3, scale: 1.05 }} className='w-full md:w-1/2 flex justify-center'>
                                            <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-56' />
                                        </motion.div>
                                        <div className='w-full md:w-1/2'>
                                            <div className='w-14 h-14 rounded-2xl flex items-center justify-center mb-5'
                                                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
                                                {item.icon}
                                            </div>
                                            <h3 className='font-bold mb-3 text-2xl' style={{ color: '#fff' }}>{item.title}</h3>
                                            <p className='text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* INTERVIEW MODES */}
                    <div className='mb-32'>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className='font-black text-center mb-20'
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', letterSpacing: '-0.5px' }}
                        >
                            Multiple Interview{" "}
                            <span style={{
                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                Modes
                            </span>
                        </motion.h2>

                        <div className='grid md:grid-cols-2 gap-8'>
                            {[
                                { img: hrImg, title: "HR Interview Mode", desc: "Behavioral and communication-focused AI evaluation." },
                                { img: techImg, title: "Technical Interview Mode", desc: "Role-specific deep technical assessments." },
                                { img: confidenceImg, title: "Confidence Detection", desc: "AI analyzes tone, hesitation and speaking confidence." },
                                { img: creditImg, title: "Smart Credit System", desc: "Unlock premium AI interviews with credits." },
                            ].map((mode, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    whileHover={{ y: -6, scale: 1.02 }}
                                    className='p-8 transition-all duration-300 relative overflow-hidden'
                                    style={cardStyle}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                                        e.currentTarget.style.boxShadow = '0 0 40px rgba(99,102,241,0.1), 0 20px 60px rgba(0,0,0,0.6)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                                    }} />
                                    <div className='flex items-center justify-between gap-6'>
                                        <div className='w-1/2'>
                                            <h3 className='font-bold text-2xl mb-3' style={{ color: '#fff' }}>{mode.title}</h3>
                                            <p className='text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.4)' }}>{mode.desc}</p>
                                        </div>
                                        <motion.div whileHover={{ rotate: 5, scale: 1.08 }} className='w-1/2 flex justify-end'>
                                            <img src={mode.img} alt={mode.title} className='w-32 h-32 object-contain' />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM CTA BANNER */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className='relative overflow-hidden rounded-[32px] p-14 text-center mb-10'
                        style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.14) 100%)',
                            border: '1px solid rgba(99,102,241,0.3)',
                        }}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(99,102,241,0.8), transparent)',
                        }} />
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className='absolute inset-0 rounded-[32px]'
                            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 60%)' }}
                        />
                        <BsStars className='text-4xl mx-auto mb-4' style={{ color: '#818cf8' }} />
                        <h2 className='text-3xl md:text-4xl font-black mb-4' style={{ color: '#fff', letterSpacing: '-0.5px' }}>
                            Ready to Ace Your Interview?
                        </h2>
                        <p className='text-lg mb-8 max-w-xl mx-auto' style={{ color: 'rgba(255,255,255,0.5)' }}>
                            Join thousands of candidates preparing smarter with AI.
                        </p>
                        <motion.button
                            onClick={() => { if (!userData) { setShowAuth(true); return } navigate("/interview") }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className='relative overflow-hidden px-12 py-4 rounded-full font-bold text-white'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 6px 32px rgba(99,102,241,0.5)',
                                fontSize: '16px',
                            }}
                        >
                            <motion.div
                                animate={{ x: ['-100%', '250%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                className='absolute inset-0 skew-x-12 w-1/3'
                                style={{ background: 'rgba(255,255,255,0.2)' }}
                            />
                            <span className='relative z-10 flex items-center gap-2'><FaRocket /> Start Free Now</span>
                        </motion.button>
                    </motion.div>

                </div>
            </div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
            <Footer />
        </div>
    )
}

export default Home
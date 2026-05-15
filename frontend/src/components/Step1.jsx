import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FaUserTie, FaBriefcase, FaFileUpload,
    FaMicrophoneAlt, FaChartLine, FaBrain,
} from "react-icons/fa"
import { BsRobot, BsCheckCircleFill } from "react-icons/bs"
import axios from "axios"
import { ServerUrl } from '../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

function Step1({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("")
    const [experience, setExperience] = useState("")
    const [mode, setMode] = useState("Technical")
    const [resumeFile, setResumeFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState([])
    const [skills, setSkills] = useState([])
    const [resumeText, setResumeText] = useState("")
    const [analysisDone, setAnalysisDone] = useState(false)
    const [analyzing, setAnalyzing] = useState(false)

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return
        setAnalyzing(true)
        const formdata = new FormData()
        formdata.append("resume", resumeFile)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })
            setRole(result.data.role || "")
            setExperience(result.data.experience || "")
            setProjects(result.data.projects || [])
            setSkills(result.data.skills || [])
            setResumeText(result.data.resumeText || "")
            setAnalysisDone(true)
            setAnalyzing(false)
        } catch (error) {
            console.log(error)
            setAnalyzing(false)
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const leftFeatures = [
        { icon: <FaUserTie />, text: "Choose Role & Experience" },
        { icon: <FaMicrophoneAlt />, text: "Smart Voice Interview" },
        { icon: <FaChartLine />, text: "Performance Analytics" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen flex items-center justify-center px-4 py-10'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}
        >
            {/* Ambient orbs */}
            <div className='fixed top-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className='fixed bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div className='relative w-full max-w-6xl overflow-hidden' style={{
                background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '28px',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.06), 0 40px 100px rgba(0,0,0,0.8)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            }}>
                {/* Top glow line */}
                <div style={{
                    position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(99,102,241,0.8), transparent)',
                }} />

                {/* LEFT PANEL */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='relative flex flex-col justify-center p-10 md:p-12'
                    style={{
                        background: 'linear-gradient(145deg, rgba(99,102,241,0.06) 0%, rgba(139,92,246,0.04) 100%)',
                        borderRight: '1px solid rgba(99,102,241,0.12)',
                    }}
                >
                    {/* Robot badge */}
                    <div className='flex items-center gap-3 mb-8'>
                        <div className='p-3 rounded-2xl' style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 0 24px rgba(99,102,241,0.5)',
                        }}>
                            <BsRobot size={22} className='text-white' />
                        </div>
                        <div className='px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase'
                            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                            AI Interview
                        </div>
                    </div>

                    <h2 className='text-4xl font-bold mb-4' style={{ color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.15 }}>
                        Start Your<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>AI Interview</span>
                    </h2>
                    <p className='mb-10 leading-relaxed' style={{ color: 'rgba(255,255,255,0.45)' }}>
                        Practice real interview scenarios powered by AI. Improve communication, technical skills, and confidence.
                    </p>

                    <div className='space-y-4'>
                        {leftFeatures.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 24, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + index * 0.15 }}
                                whileHover={{ scale: 1.03, x: 4 }}
                                className='flex items-center gap-4 p-4 rounded-2xl cursor-default transition-all'
                                style={{
                                    background: 'rgba(99,102,241,0.07)',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.1)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                            >
                                <div style={{ color: '#818cf8', fontSize: '18px' }}>{item.icon}</div>
                                <span className='font-medium' style={{ color: 'rgba(255,255,255,0.8)' }}>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT PANEL — form */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='p-10 md:p-12'
                >
                    <h2 className='text-3xl font-bold mb-8' style={{ color: '#fff', letterSpacing: '-0.4px' }}>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>
                        {/* Role input */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-4 left-4' style={{ color: 'rgba(129,140,248,0.6)' }} />
                            <input
                                list="roleOptions"
                                type='text' placeholder='Enter role (e.g. AI Engineer)'
                                value={role} onChange={(e) => setRole(e.target.value)}
                                className='w-full pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all font-medium'
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(99,102,241,0.2)',
                                    color: '#fff',
                                    fontSize: '14px',
                                }}
                                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.background = 'rgba(99,102,241,0.07)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                                onBlur={e => { e.target.style.borderColor = 'rgba(99,102,241,0.2)'; e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.boxShadow = 'none' }}
                                />
                        </div>

                        {/* Experience input */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-4 left-4' style={{ color: 'rgba(129,140,248,0.6)' }} />
                            <select
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                                className='w-full pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all font-medium'
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(99,102,241,0.2)',
                                    color: '#fff',
                                    fontSize: '14px',
                                    appearance: 'none',
                                }}
                                onFocus={e => {
                                    e.target.style.borderColor = 'rgba(99,102,241,0.6)'
                                    e.target.style.background = 'rgba(99,102,241,0.07)'
                                    e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'
                                }}
                                onBlur={e => {
                                    e.target.style.borderColor = 'rgba(99,102,241,0.2)'
                                    e.target.style.background = 'rgba(255,255,255,0.04)'
                                    e.target.style.boxShadow = 'none'
                                }}
                            >
                                <option value="" disabled style={{ background: '#0a0a1a' }}>
                                    Select Experience
                                </option>
                                <option value="Fresher" style={{ background: '#0a0a1a' }}>Fresher</option>
                                <option value="0-1 Years" style={{ background: '#0a0a1a' }}>0-1 Years</option>
                                <option value="1-3 Years" style={{ background: '#0a0a1a' }}>1-3 Years</option>
                                <option value="3-6 Years" style={{ background: '#0a0a1a' }}>3-6 Years</option>
                                <option value="5+ Years" style={{ background: '#0a0a1a' }}>5+ Years</option>
                                <option value="10+ Years" style={{ background: '#0a0a1a' }}>10+ Years</option>
                            </select>
                        </div>



                        {/* Mode select */}
                        <select
                            value={mode} onChange={(e) => setMode(e.target.value)}
                            className='w-full py-3.5 px-4 rounded-xl outline-none transition-all font-medium cursor-pointer'
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(99,102,241,0.2)',
                                color: '#fff',
                                fontSize: '14px',
                                appearance: 'none',
                            }}
                        >
                            <option value="Technical" style={{ background: '#0a0a1a' }}>Technical Interview</option>
                            <option value="HR" style={{ background: '#0a0a1a' }}>HR Interview</option>
                        </select>

                        {/* Resume upload */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='rounded-2xl p-8 text-center cursor-pointer transition-all'
                                style={{
                                    border: '2px dashed rgba(99,102,241,0.25)',
                                    background: 'rgba(99,102,241,0.04)',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
                                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)'
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'
                                    e.currentTarget.style.background = 'rgba(99,102,241,0.04)'
                                }}
                            >
                                <FaFileUpload className='text-4xl mx-auto mb-3' style={{ color: '#818cf8' }} />
                                <input
                                    type="file" accept="application/pdf" id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                                <p className='font-medium text-sm' style={{ color: 'rgba(255,255,255,0.55)' }}>
                                    {resumeFile ? resumeFile.name : "Click to upload resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={(e) => { e.stopPropagation(); handleUploadResume() }}
                                        className='mt-4 px-6 py-2 rounded-xl font-semibold text-sm text-white transition-all'
                                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 16px rgba(99,102,241,0.35)' }}
                                    >
                                        {analyzing ? (
                                            <span className='flex items-center gap-2'>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className='inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full'
                                                />
                                                Analyzing...
                                            </span>
                                        ) : "Analyze Resume"}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {/* Resume results */}
                        <AnimatePresence>
                            {analysisDone && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className='rounded-2xl p-5 space-y-4'
                                    style={{
                                        background: 'rgba(99,102,241,0.07)',
                                        border: '1px solid rgba(99,102,241,0.2)',
                                    }}
                                >
                                    <div className='flex items-center gap-2'>
                                        <BsCheckCircleFill style={{ color: '#818cf8' }} />
                                        <h3 className='text-base font-semibold' style={{ color: '#fff' }}>Resume Analysis Complete</h3>
                                    </div>

                                    {projects.length > 0 && (
                                        <div>
                                            <p className='font-medium text-sm mb-2' style={{ color: 'rgba(255,255,255,0.6)' }}>Projects:</p>
                                            <ul className='space-y-1'>
                                                {projects.map((p, i) => (
                                                    <li key={i} className='text-sm' style={{ color: 'rgba(255,255,255,0.5)' }}>• {p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {skills.length > 0 && (
                                        <div>
                                            <p className='font-medium text-sm mb-2' style={{ color: 'rgba(255,255,255,0.6)' }}>Skills:</p>
                                            <div className='flex flex-wrap gap-2'>
                                                {skills.map((s, i) => (
                                                    <span key={i} className='px-3 py-1 rounded-full text-xs font-semibold'
                                                        style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Start button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            className='w-full py-4 rounded-2xl text-lg font-bold text-white transition-all relative overflow-hidden'
                            style={{
                                background: (!role || !experience || loading)
                                    ? 'rgba(255,255,255,0.08)'
                                    : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: (!role || !experience || loading)
                                    ? 'none'
                                    : '0 6px 28px rgba(99,102,241,0.45)',
                                cursor: (!role || !experience || loading) ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? (
                                <span className='flex items-center justify-center gap-3'>
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full'
                                    />
                                    Starting...
                                </span>
                            ) : (
                                <span className='flex items-center justify-center gap-2'>
                                    <FaBrain />
                                    Start Interview
                                </span>
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1
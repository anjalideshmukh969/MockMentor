import React from 'react'
import { BsRobot } from "react-icons/bs"
import { IoSparkles } from "react-icons/io5"
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div
            className={`w-full ${isModel ? "py-4" : "min-h-screen flex items-center justify-center px-6 py-20"}`}
            style={!isModel ? { background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' } : {}}
        >
            {/* Full-page extras */}
            {!isModel && (
                <>
                    {/* Grid pattern */}
                    <div className='fixed inset-0 pointer-events-none' style={{
                        backgroundImage: `linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)`,
                        backgroundSize: '52px 52px',
                    }} />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className='fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(70px)' }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className='fixed bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(55px)' }}
                    />
                </>
            )}

            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full overflow-hidden ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}`}
                style={!isModel ? {
                    background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(18,18,42,0.97) 100%)',
                    border: '1px solid rgba(99,102,241,0.22)',
                    boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 40px 100px rgba(0,0,0,0.8)',
                } : {}}
            >
                {/* Top glow line — full page only */}
                {!isModel && (
                    <div style={{
                        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(99,102,241,0.8), transparent)',
                    }} />
                )}

                {/* Logo row */}
                <div className='flex items-center justify-center gap-3 mb-7'>
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className='p-2.5 rounded-xl text-white'
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.45)' }}
                    >
                        <BsRobot size={18} />
                    </motion.div>
                    <h2 className='font-bold text-lg' style={{ color: isModel ? undefined : '#fff' }}>MockMentor</h2>
                </div>

                {/* Headline */}
                <h1 className='text-2xl md:text-3xl font-bold text-center leading-snug mb-4'
                    style={{ color: isModel ? undefined : '#fff', letterSpacing: '-0.4px' }}>
                    Continue with{' '}
                    <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold align-middle'
                        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', color: '#a5b4fc' }}>
                        <IoSparkles size={13} />
                        AI Smart Interview
                    </span>
                </h1>

                <p className='text-center text-sm md:text-base leading-relaxed mb-9'
                    style={{ color: isModel ? undefined : 'rgba(255,255,255,0.4)' }}>
                    Sign in to start AI-powered mock interviews,
                    track your progress, and unlock detailed performance insights.
                </p>

                {/* Google button */}
                <motion.button
                    onClick={handleGoogleAuth}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className='w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-semibold text-sm relative overflow-hidden'
                    style={{
                        background: isModel
                            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                            : 'rgba(255,255,255,0.06)',
                        border: isModel ? 'none' : '1px solid rgba(255,255,255,0.12)',
                        color: '#fff',
                        boxShadow: isModel ? '0 6px 24px rgba(99,102,241,0.4)' : 'none',
                    }}
                    onMouseEnter={e => {
                        if (!isModel) {
                            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'
                            e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                            e.currentTarget.style.boxShadow = '0 0 28px rgba(99,102,241,0.2)'
                        }
                    }}
                    onMouseLeave={e => {
                        if (!isModel) {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                            e.currentTarget.style.boxShadow = 'none'
                        }
                    }}
                >
                    {/* Shine sweep */}
                    <motion.div
                        animate={{ x: ['-100%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className='absolute inset-0 skew-x-12 w-1/3'
                        style={{ background: 'rgba(255,255,255,0.07)' }}
                    />
                    <FcGoogle size={20} />
                    <span className='relative z-10'>Continue with Google</span>
                </motion.button>

                <p className='text-center text-xs mt-5' style={{ color: 'rgba(255,255,255,0.2)' }}>
                    By signing in you agree to our Terms &amp; Privacy Policy
                </p>
            </motion.div>
        </div>
    )
}

export default Auth
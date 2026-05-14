import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { AnimatePresence } from "framer-motion"
import { BsRobot, BsCoin } from "react-icons/bs"
import { HiOutlineLogout } from "react-icons/hi"
import { FaUserAstronaut } from "react-icons/fa"
import { MdWorkspacePremium } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'

function Navbar() {

    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center px-4 pt-6 relative overflow-visible'
            style={{ background: 'linear-gradient(180deg, #05050f 0%, transparent 100%)' }}>

            {/* Ambient background blobs */}
            <div className='absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', filter: 'blur(48px)' }} />
            <div className='absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(48px)' }} />

            {/* Navbar pill */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className='relative z-20 w-full max-w-6xl flex justify-between items-center px-6 py-3'
                style={{
                    background: 'rgba(10,10,25,0.85)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '28px',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 0 0 1px rgba(99,102,241,0.06), 0 12px 40px rgba(0,0,0,0.5)',
                }}
            >
                {/* Top glow line */}
                <div style={{
                    position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(139,92,246,0.7), rgba(99,102,241,0.6), transparent)',
                }} />

                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    onClick={() => navigate("/")}
                    className='flex items-center gap-3 cursor-pointer'
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className='p-2.5 rounded-xl text-white'
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                        }}
                    >
                        <BsRobot size={18} />
                    </motion.div>
                    <div className='hidden md:block'>
                        <h1 className='font-bold text-lg' style={{ color: '#fff', letterSpacing: '-0.3px' }}>MockMentor</h1>
                        <p className='text-xs font-medium' style={{ color: '#818cf8' }}>AI Powered Interview System</p>
                    </div>
                </motion.div>

                {/* Right section */}
                <div className='flex items-center gap-4 relative'>

                    {/* Live status badge */}
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        className='hidden lg:flex items-center gap-2 px-4 py-2 rounded-full'
                        style={{
                            background: 'rgba(99,102,241,0.08)',
                            border: '1px solid rgba(99,102,241,0.2)',
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className='w-2 h-2 rounded-full'
                            style={{ background: '#818cf8' }}
                        />
                        <span className='text-sm font-medium' style={{ color: '#a5b4fc' }}>AI Active</span>
                    </motion.div>

                    {/* Credits button */}
                    <div className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -1 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return }
                                setShowCreditPopup(!showCreditPopup)
                                setShowUserPopup(false)
                            }}
                            className='relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-white'
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                            }}
                        >
                            {/* Shine sweep */}
                            <motion.div
                                animate={{ x: ['-100%', '250%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                className='absolute inset-0 skew-x-12 w-1/3'
                                style={{ background: 'rgba(255,255,255,0.18)' }}
                            />
                            <BsCoin size={18} />
                            <span>{userData?.credits || 0}</span>
                        </motion.button>

                        {/* Credit popup */}
                        <AnimatePresence>
                            {showCreditPopup && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-[-40px] mt-4 w-72 rounded-3xl p-5 z-[999]'
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(18,18,40,0.97) 100%)',
                                        border: '1px solid rgba(99,102,241,0.25)',
                                        boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.08)',
                                    }}
                                >
                                    {/* Glow line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)',
                                    }} />

                                    <div className='flex items-center gap-3 mb-4'>
                                        <div className='p-3 rounded-2xl' style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                                            <MdWorkspacePremium size={22} />
                                        </div>
                                        <div>
                                            <h3 className='font-semibold' style={{ color: '#fff' }}>Premium Credits</h3>
                                            <p className='text-xs' style={{ color: 'rgba(255,255,255,0.4)' }}>Unlock more AI interviews</p>
                                        </div>
                                    </div>

                                    <div className='rounded-2xl p-4 mb-4' style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                                        <p className='text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.55)' }}>
                                            Buy credits to continue advanced mock interviews, AI analysis and detailed reports.
                                        </p>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => navigate("/pricing")}
                                        className='w-full py-3 rounded-2xl font-semibold text-white'
                                        style={{
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                                        }}
                                    >
                                        Buy More Credits
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* User button */}
                    <div className='relative'>
                        <motion.button
                            whileHover={{ scale: 1.08, rotate: 3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                if (!userData) { setShowAuth(true); return }
                                setShowUserPopup(!showUserPopup)
                                setShowCreditPopup(false)
                            }}
                            className='relative w-11 h-11 rounded-full flex items-center justify-center font-semibold text-white'
                            style={{
                                background: userData
                                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                    : 'rgba(255,255,255,0.08)',
                                border: '2px solid rgba(99,102,241,0.4)',
                                boxShadow: userData ? '0 0 20px rgba(99,102,241,0.35)' : 'none',
                            }}
                        >
                            {userData ? (
                                <>
                                    {userData?.name?.slice(0, 1).toUpperCase()}
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className='absolute bottom-0 right-0 w-3 h-3 rounded-full border-2'
                                        style={{ background: '#22c55e', borderColor: '#05050f' }}
                                    />
                                </>
                            ) : (
                                <FaUserAstronaut size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                            )}
                        </motion.button>

                        {/* User popup */}
                        <AnimatePresence>
                            {showUserPopup && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className='absolute right-0 mt-4 w-56 rounded-3xl p-5 z-[999]'
                                    style={{
                                        background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(18,18,40,0.97) 100%)',
                                        border: '1px solid rgba(99,102,241,0.25)',
                                        boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(99,102,241,0.08)',
                                    }}
                                >
                                    {/* Glow line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)',
                                    }} />

                                    <div className='pb-4 mb-4' style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-12 h-12 rounded-full flex items-center justify-center font-bold text-white'
                                                style={{
                                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                                    boxShadow: '0 0 16px rgba(99,102,241,0.4)',
                                                }}>
                                                {userData?.name?.slice(0, 1).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className='font-semibold' style={{ color: '#fff' }}>{userData?.name}</p>
                                                <p className='text-xs' style={{ color: '#818cf8' }}>AI Candidate</p>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ x: 4 }}
                                        onClick={() => navigate("/history")}
                                        className='w-full text-left text-sm py-3 px-3 rounded-xl transition'
                                        style={{ color: 'rgba(255,255,255,0.7)' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.color = '#fff' }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                                    >
                                        Interview History
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ x: 4 }}
                                        onClick={handleLogout}
                                        className='w-full text-left text-sm py-3 px-3 rounded-xl flex items-center gap-2 transition'
                                        style={{ color: '#f87171' }}
                                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <HiOutlineLogout size={16} />
                                        Logout
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Auth Modal */}
            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar
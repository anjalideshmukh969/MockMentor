import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { motion } from "motion/react"
import {
    FaGithub,
    FaLinkedin,
    FaBrain,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa"

const Footer = () => {

    const socialLinks = [
        { icon: <FaGithub />, link: "https://github.com/anjalideshmukh969" },
        { icon: <FaLinkedin />, link: "https://linkedin.com/in/anjalideshmukh-" },
    ]

    const features = [
        { icon: <FaBrain />, title: "AI Question Generation" },
        { icon: <FaMicrophoneAlt />, title: "Voice Interview Practice" },
        { icon: <FaChartLine />, title: "Performance Analytics" },
    ]

    const stats = [
        { value: "10K+", label: "AI Questions" },
        { value: "95%", label: "Accuracy" },
        { value: "24/7", label: "AI Support" },
    ]

    return (
        <div className='relative overflow-hidden flex justify-center px-4 pb-10 pt-10'
            style={{ background: 'linear-gradient(180deg, #05050f 0%, #080818 100%)' }}>

            {/* Ambient glow orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.13, 0.06] }}
                transition={{ duration: 7, repeat: Infinity }}
                className='absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.1, 0.04] }}
                transition={{ duration: 9, repeat: Infinity }}
                className='absolute bottom-[-100px] right-[-80px] w-[380px] h-[380px] rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(60px)' }}
            />

            {/* Floating particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ y: [0, -18, 0], opacity: [0.15, 0.5, 0.15] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                    className='absolute w-1.5 h-1.5 rounded-full pointer-events-none'
                    style={{
                        background: i % 2 === 0 ? '#6366f1' : '#8b5cf6',
                        top: `${10 + (i * 7.5) % 85}%`,
                        left: `${5 + (i * 8.3) % 90}%`,
                        opacity: 0.2,
                    }}
                />
            ))}

            {/* Main card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='relative z-10 w-full max-w-6xl overflow-hidden'
                style={{
                    background: 'linear-gradient(145deg, rgba(15,15,30,0.98) 0%, rgba(20,20,45,0.96) 100%)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '32px',
                    boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 32px 80px rgba(0,0,0,0.7)',
                    padding: '40px 24px',
                }}
            >
                {/* Top glow line */}
                <div style={{
                    position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(99,102,241,0.8), transparent)',
                }} />

                {/* AI scan sweep */}
                <motion.div
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className='absolute inset-0 pointer-events-none'
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.04), transparent)', zIndex: 0 }}
                />

                {/* Logo */}
                <div className='relative z-10 flex flex-col items-center text-center'>
                    <motion.div
                        animate={{ y: [0, -7, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className='relative p-4 rounded-2xl mb-5 shadow-lg'
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            boxShadow: '0 0 32px rgba(99,102,241,0.4)',
                        }}
                    >
                        <BsRobot size={28} className='text-white' />
                        <motion.div
                            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className='absolute -top-1 -right-1 w-3 h-3 rounded-full'
                            style={{ background: '#a5b4fc' }}
                        />
                    </motion.div>

                    <h2 className='font-bold text-3xl tracking-wide mb-2' style={{ color: '#fff', letterSpacing: '-0.5px' }}>
                        MockMentor
                    </h2>
                    <p className='text-sm mb-5 tracking-widest font-medium uppercase' style={{ color: '#818cf8', letterSpacing: '0.15em' }}>
                        AI Interview Intelligence Platform
                    </p>
                    <p className='text-sm md:text-base max-w-2xl leading-relaxed mb-10' style={{ color: 'rgba(255,255,255,0.45)' }}>
                        AI-powered interview preparation platform designed to enhance
                        communication skills, technical expertise, confidence,
                        and placement readiness through intelligent mock interviews
                        and real-time performance analytics.
                    </p>
                </div>

                {/* Features */}
                <div className='relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.04, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className='rounded-2xl p-5 text-center cursor-default'
                            style={{
                                background: 'rgba(99,102,241,0.07)',
                                border: '1px solid rgba(99,102,241,0.18)',
                                backdropFilter: 'blur(12px)',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'
                                e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.15)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            <div className='flex justify-center text-2xl mb-3' style={{ color: '#818cf8' }}>
                                {item.icon}
                            </div>
                            <h3 className='font-semibold text-sm md:text-base' style={{ color: 'rgba(255,255,255,0.85)' }}>
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className='relative z-10 grid grid-cols-3 gap-4 mb-10'>
                    {stats.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className='rounded-2xl p-4 text-center'
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                            }}
                        >
                            <h2 className='text-2xl md:text-3xl font-bold' style={{
                                background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                {item.value}
                            </h2>
                            <p className='text-xs md:text-sm mt-1' style={{ color: 'rgba(255,255,255,0.35)' }}>
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Social links */}
                <div className='relative z-10 flex justify-center gap-5 mb-8'>
                    {socialLinks.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            target='_blank'
                            rel='noopener noreferrer'
                            whileHover={{ scale: 1.18, rotate: 8 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer transition-all duration-300'
                            style={{
                                background: 'rgba(99,102,241,0.1)',
                                border: '1px solid rgba(99,102,241,0.25)',
                                color: '#818cf8',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                                e.currentTarget.style.color = '#fff'
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.4)'
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                                e.currentTarget.style.color = '#818cf8'
                                e.currentTarget.style.boxShadow = 'none'
                            }}
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </div>

                {/* Footer bottom */}
                <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className='relative z-10'
                    style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px', textAlign: 'center' }}
                >
                    <p className='text-sm' style={{ color: 'rgba(255,255,255,0.25)' }}>
                        © 2026 MockMentor — Powered by AI Innovation 🚀
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Footer
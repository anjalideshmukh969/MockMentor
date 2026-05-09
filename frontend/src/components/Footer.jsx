import React from 'react'
import { BsRobot } from 'react-icons/bs'
import { motion } from "motion/react"

import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaBrain,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa"

const Footer = () => {

    const socialLinks = [
        {
            icon: <FaGithub />,
            link: "https://github.com/anjalideshmukh969"
        },
        {
            icon: <FaLinkedin />,
            link: "https://linkedin.com/in/anjalideshmukh-"
        },

    ]

    return (

        <div className='relative overflow-hidden bg-[#f7faf7] flex justify-center px-4 pb-10 pt-10'>

            {/* Background Glow */}

            <motion.div

                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.08, 0.15, 0.08]
                }}

                transition={{
                    duration: 6,
                    repeat: Infinity
                }}

                className='absolute top-[-100px] left-[-100px] w-[320px] h-[320px] bg-green-400 blur-3xl rounded-full'
            />

            <motion.div

                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.05, 0.12, 0.05]
                }}

                transition={{
                    duration: 8,
                    repeat: Infinity
                }}

                className='absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-green-300 blur-3xl rounded-full'
            />

            {/* Floating Particles */}

            {
                [...Array(12)].map((_, i) => (

                    <motion.div

                        key={i}

                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.6, 0.2]
                        }}

                        transition={{
                            duration: 3 + i,
                            repeat: Infinity
                        }}

                        className='absolute w-2 h-2 bg-green-400 rounded-full opacity-20'

                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`
                        }}
                    />
                ))
            }

            {/* Main Footer */}

            <motion.div

                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}

                transition={{
                    duration: 0.8
                }}

                viewport={{ once: true }}

                className='relative z-10 w-full max-w-6xl
                bg-white/90 backdrop-blur-2xl
                border border-green-100
                rounded-[32px]
                shadow-[0_8px_40px_rgba(34,197,94,0.12)]
                px-6 py-10 overflow-hidden'
            >

                {/* AI Scan Effect */}

                <motion.div

                    animate={{
                        y: ["-100%", "100%"]
                    }}

                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}

                    className='absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent pointer-events-none'
                />

                {/* Logo */}

                <div className='flex flex-col items-center text-center'>

                    <motion.div

                        animate={{
                            y: [0, -8, 0]
                        }}

                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}

                        className='relative bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg mb-4'
                    >

                        <BsRobot size={28} />

                        {/* AI Pulse */}

                        <motion.div

                            animate={{
                                scale: [1, 1.5, 1]
                            }}

                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}

                            className='absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full'
                        />

                    </motion.div>

                    <h2 className='font-bold text-3xl text-gray-800 tracking-wide mb-2'>
                        MockMentor
                    </h2>

                    <p className='text-green-600 text-sm mb-5 tracking-wide font-medium'>
                        AI Interview Intelligence Platform
                    </p>

                    {/* Description */}

                    <p className='text-gray-600 text-sm md:text-base max-w-2xl leading-relaxed mb-8'>
                        AI-powered interview preparation platform designed to enhance
                        communication skills, technical expertise, confidence,
                        and placement readiness through intelligent mock interviews
                        and real-time performance analytics.
                    </p>

                </div>

                {/* Features */}

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10'>

                    {
                        [
                            {
                                icon: <FaBrain />,
                                title: "AI Question Generation"
                            },
                            {
                                icon: <FaMicrophoneAlt />,
                                title: "Voice Interview Practice"
                            },
                            {
                                icon: <FaChartLine />,
                                title: "Performance Analytics"
                            },
                        ].map((item, index) => (

                            <motion.div

                                key={index}

                                whileHover={{
                                    scale: 1.05,
                                    y: -4
                                }}

                                className='bg-green-50 border border-green-100
                                rounded-2xl p-5 text-center'
                            >

                                <div className='flex justify-center text-2xl text-green-600 mb-3'>
                                    {item.icon}
                                </div>

                                <h3 className='text-gray-800 font-semibold text-sm md:text-base'>
                                    {item.title}
                                </h3>

                            </motion.div>
                        ))
                    }

                </div>

                {/* Stats */}

                <div className='grid grid-cols-3 gap-4 mb-10'>

                    {
                        [
                            {
                                value: "10K+",
                                label: "AI Questions"
                            },
                            {
                                value: "95%",
                                label: "Accuracy"
                            },
                            {
                                value: "24/7",
                                label: "AI Support"
                            },
                        ].map((item, index) => (

                            <motion.div

                                key={index}

                                whileHover={{
                                    scale: 1.05
                                }}

                                className='bg-white border border-green-100
                                rounded-2xl p-4 text-center shadow-sm'
                            >

                                <h2 className='text-2xl md:text-3xl font-bold text-green-600'>
                                    {item.value}
                                </h2>

                                <p className='text-xs md:text-sm text-gray-500 mt-1'>
                                    {item.label}
                                </p>

                            </motion.div>
                        ))
                    }

                </div>

                {/* Social Links */}

                <div className='flex justify-center gap-5 mb-8'>

                    {
                        socialLinks.map((item, index) => (

                            <motion.a

                                key={index}

                                href={item.link}

                                target='_blank'

                                rel='noopener noreferrer'

                                whileHover={{
                                    scale: 1.2,
                                    rotate: 8
                                }}

                                whileTap={{
                                    scale: 0.9
                                }}

                                className='w-12 h-12 rounded-full
                                bg-green-50 border border-green-100
                                flex items-center justify-center
                                text-xl text-green-600 cursor-pointer
                                hover:bg-green-500
                                hover:text-white
                                transition-all duration-300 shadow-sm'
                            >

                                {item.icon}

                            </motion.a>
                        ))
                    }

                </div>

                {/* Footer Bottom */}

                <motion.div

                    animate={{
                        opacity: [0.5, 1, 0.5]
                    }}

                    transition={{
                        duration: 2,
                        repeat: Infinity
                    }}

                    className='border-t border-green-100 pt-5 text-center'
                >

                    <p className='text-gray-500 text-sm'>
                        © 2026 MockMentor — Powered by AI Innovation 🚀
                    </p>

                </motion.div>

            </motion.div>

        </div>
    )
}

export default Footer
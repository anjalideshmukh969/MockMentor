import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { BsRobot } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { ServerUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Pricing() {
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState("free")
    const [loadingPlan, setLoadingPlan] = useState(null)
    const dispatch = useDispatch()

    const plans = [
        {
            id: "free",
            name: "Free",
            price: "₹0",
            credits: 100,
            description: "Perfect for beginners starting interview preparation.",
            features: [
                "100 AI Interview Credits",
                "Basic Performance Report",
                "Voice Interview Access",
                "Limited History Tracking",
            ],
            default: true,
        },
        {
            id: "basic",
            name: "Starter Pack",
            price: "₹100",
            credits: 150,
            description: "Great for focused practice and skill improvement.",
            features: [
                "150 AI Interview Credits",
                "Detailed Feedback",
                "Performance Analytics",
                "Full Interview History",
            ],
        },
        {
            id: "pro",
            name: "Pro Pack",
            price: "₹500",
            credits: 650,
            description: "Best value for serious job preparation.",
            features: [
                "650 AI Interview Credits",
                "Advanced AI Feedback",
                "Skill Trend Analysis",
                "Priority AI Processing",
            ],
            badge: "Best Value",
        },
    ]

    const handlePayment = async (plan) => {
        try {
            setLoadingPlan(plan.id)
            const amount =
                plan.id === "basic" ? 100 :
                    plan.id === "pro" ? 500 : 0

            const result = await axios.post(ServerUrl + "/api/payment/order", {
                planId: plan.id,
                amount: amount,
                credits: plan.credits,
            }, { withCredentials: true })

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: result.data.amount,
                currency: "INR",
                name: "InterviewIQ.AI",
                description: `${plan.name} - ${plan.credits} Credits`,
                order_id: result.data.id,
                handler: async function (response) {
                    const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
                    dispatch(setUserData(verifypay.data.user))
                    alert("Payment Successful 🎉 Credits Added!")
                    navigate("/")
                },
                theme: { color: "#6366f1" },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
            setLoadingPlan(null)
        } catch (error) {
            console.log(error)
            setLoadingPlan(null)
        }
    }

    return (
        <div className='min-h-screen py-16 px-6 relative overflow-hidden'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

            {/* Grid */}
            <div className='fixed inset-0 pointer-events-none' style={{
                backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
                backgroundSize: '56px 56px',
            }} />

            {/* Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
                transition={{ duration: 8, repeat: Infinity }}
                className='fixed top-[-80px] left-[-80px] w-80 h-80 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 10, repeat: Infinity }}
                className='fixed bottom-[-80px] right-[-80px] w-72 h-72 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(55px)' }}
            />

            {/* Header */}
            <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4 relative z-10'>
                <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/")}
                    className='mt-2 p-3 rounded-full transition-all'
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }}
                >
                    <FaArrowLeft />
                </motion.button>

                <div className="text-center w-full">
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <div className='p-2.5 rounded-xl' style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 0 18px rgba(99,102,241,0.4)' }}>
                            <BsRobot size={18} className='text-white' />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold" style={{ color: '#fff', letterSpacing: '-0.5px' }}>Choose Your Plan</h1>
                    <p className="mt-3 text-lg" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Flexible pricing to match your interview preparation goals.
                    </p>
                </div>
            </div>

            {/* Plan cards */}
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto relative z-10'>
                {plans.map((plan) => {
                    const isSelected = selectedPlan === plan.id

                    return (
                        <motion.div
                            key={plan.id}
                            whileHover={!plan.default ? { scale: 1.02, y: -4 } : {}}
                            onClick={() => !plan.default && setSelectedPlan(plan.id)}
                            className='relative overflow-hidden p-8 transition-all duration-300'
                            style={{
                                background: isSelected && !plan.default
                                    ? 'linear-gradient(145deg, rgba(16,14,40,0.99) 0%, rgba(22,18,52,0.98) 100%)'
                                    : 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                                border: isSelected && !plan.default
                                    ? '1px solid rgba(99,102,241,0.55)'
                                    : plan.default
                                        ? '1px solid rgba(255,255,255,0.08)'
                                        : '1px solid rgba(99,102,241,0.18)',
                                borderRadius: '24px',
                                boxShadow: isSelected && !plan.default
                                    ? '0 0 48px rgba(99,102,241,0.2), 0 20px 60px rgba(0,0,0,0.6)'
                                    : '0 8px 32px rgba(0,0,0,0.5)',
                                cursor: plan.default ? 'default' : 'pointer',
                            }}
                        >
                            {/* Top glow line */}
                            <div style={{
                                position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                                background: isSelected && !plan.default
                                    ? 'linear-gradient(90deg, transparent, rgba(99,102,241,0.9), rgba(139,92,246,1), rgba(99,102,241,0.9), transparent)'
                                    : 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)',
                            }} />

                            {/* Glow blob on selected */}
                            {isSelected && !plan.default && (
                                <motion.div
                                    animate={{ opacity: [0.15, 0.3, 0.15] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                    className='absolute top-0 left-0 right-0 h-40 pointer-events-none'
                                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.2), transparent 70%)' }}
                                />
                            )}

                            {/* Best Value badge */}
                            {plan.badge && (
                                <motion.div
                                    animate={{ boxShadow: ['0 0 10px rgba(99,102,241,0.4)', '0 0 24px rgba(99,102,241,0.7)', '0 0 10px rgba(99,102,241,0.4)'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className='absolute top-5 right-5 text-xs font-bold px-4 py-1.5 rounded-full text-white'
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    }}
                                >
                                    {plan.badge}
                                </motion.div>
                            )}

                            {/* Default tag */}
                            {plan.default && (
                                <div className='absolute top-5 right-5 text-xs px-3 py-1 rounded-full'
                                    style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    Default
                                </div>
                            )}

                            {/* Plan name */}
                            <h3 className='text-xl font-bold mb-4' style={{ color: '#fff' }}>{plan.name}</h3>

                            {/* Price */}
                            <div className='mb-4'>
                                <span className='text-4xl font-black' style={{
                                    background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    {plan.price}
                                </span>
                                <p className='text-sm mt-1' style={{ color: 'rgba(255,255,255,0.35)' }}>{plan.credits} Credits</p>
                            </div>

                            {/* Description */}
                            <p className='text-sm leading-relaxed mb-6' style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {plan.description}
                            </p>

                            {/* Divider */}
                            <div className='mb-6' style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                            {/* Features */}
                            <div className='space-y-3 mb-8'>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className='flex items-center gap-3'>
                                        <FaCheckCircle style={{ color: '#818cf8', fontSize: '13px', flexShrink: 0 }} />
                                        <span className='text-sm' style={{ color: 'rgba(255,255,255,0.6)' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            {!plan.default && (
                                <motion.button
                                    disabled={loadingPlan === plan.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        if (!isSelected) {
                                            setSelectedPlan(plan.id)
                                        } else {
                                            handlePayment(plan)
                                        }
                                    }}
                                    className='w-full py-3.5 rounded-xl font-bold text-white transition-all relative overflow-hidden'
                                    style={isSelected
                                        ? {
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            boxShadow: '0 4px 24px rgba(99,102,241,0.45)',
                                        }
                                        : {
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(99,102,241,0.25)',
                                            color: 'rgba(255,255,255,0.6)',
                                        }
                                    }
                                >
                                    {loadingPlan === plan.id ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full'
                                            />
                                            Processing...
                                        </span>
                                    ) : isSelected ? "Proceed to Pay" : "Select Plan"}
                                </motion.button>
                            )}
                        </motion.div>
                    )
                })}
            </div>

            {/* Bottom note */}
            <p className='text-center text-xs mt-10 relative z-10' style={{ color: 'rgba(255,255,255,0.2)' }}>
                Secure payment powered by Razorpay · Credits never expire
            </p>
        </div>
    )
}

export default Pricing
import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { BsLightningCharge, BsStars } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const C = {
  bg: '#04080f',
  surface: 'rgba(255,255,255,0.04)',
  surfaceBright: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.07)',
  borderGreen: 'rgba(16,185,129,0.25)',
  accent: '#10b981',
  accentDim: 'rgba(16,185,129,0.12)',
  text: '#f0faf6',
  muted: 'rgba(255,255,255,0.42)',
  faint: 'rgba(255,255,255,0.14)',
}

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "forever",
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
      period: "one-time",
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
      period: "one-time",
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
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)
      const amount = plan.id === "basic" ? 100 : plan.id === "pro" ? 500 : 0;
      const result = await axios.post(ServerUrl + "/api/payment/order", {
        planId: plan.id, amount, credits: plan.credits,
      }, { withCredentials: true })

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "MockMentor.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,
        handler: async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify", response, { withCredentials: true })
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme: { color: "#10b981" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      color: C.text,
      fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Ambient */}
      <div style={{
        position: 'fixed', top: '-25%', left: '-15%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-25%', right: '-15%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.faint} 1px,transparent 1px),linear-gradient(90deg,${C.faint} 1px,transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.12
      }} />

      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', position: 'relative', zIndex: 1 }}>

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 64 }}
        >
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: 4, padding: 12,
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 12, cursor: 'pointer', color: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <FaArrowLeft size={14} />
          </button>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: C.accentDim, border: `1px solid ${C.borderGreen}`,
              borderRadius: 100, padding: '5px 14px', marginBottom: 12
            }}>
              <BsStars size={12} color={C.accent} />
              <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>Transparent Pricing</span>
            </div>
            <h1 style={{ fontSize: 'clamp(30px,5vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#fff', marginBottom: 10 }}>
              Choose Your Plan
            </h1>
            <p style={{ fontSize: 16, color: C.muted }}>
              Flexible one-time credits to match your interview preparation goals.
            </p>
          </div>
        </motion.div>

        {/* ── Plan Cards ─────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20, alignItems: 'start'
        }}>
          {plans.map((plan, i) => {
            const isSelected = selectedPlan === plan.id
            const isPro = plan.id === 'pro'

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!plan.default ? { y: -6 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                style={{
                  background: isSelected
                    ? 'rgba(16,185,129,0.06)'
                    : C.surface,
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${isSelected ? 'rgba(16,185,129,0.35)' : C.border}`,
                  borderRadius: 28,
                  padding: '36px 32px',
                  cursor: plan.default ? 'default' : 'pointer',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isPro && isSelected ? '0 0 48px rgba(16,185,129,0.12)' : 'none'
                }}
              >
                {/* Glow for selected */}
                {isSelected && (
                  <div style={{
                    position: 'absolute', top: -40, right: -40, width: 160, height: 160,
                    background: 'radial-gradient(circle, rgba(16,185,129,0.14), transparent 70%)',
                    borderRadius: '50%', pointerEvents: 'none'
                  }} />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                    padding: '4px 12px', borderRadius: 100,
                    letterSpacing: 0.5,
                    boxShadow: '0 0 14px rgba(16,185,129,0.4)'
                  }}>
                    {plan.badge}
                  </div>
                )}

                {plan.default && (
                  <div style={{
                    position: 'absolute', top: 20, right: 20,
                    background: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600,
                    padding: '4px 12px', borderRadius: 100,
                    border: `1px solid ${C.border}`
                  }}>
                    Default
                  </div>
                )}

                {/* Plan name */}
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{plan.name}</h3>

                {/* Price */}
                <div style={{ marginBottom: 6 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: C.accent, letterSpacing: '-1px' }}>{plan.price}</span>
                </div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: C.accentDim, border: `1px solid ${C.borderGreen}`,
                  borderRadius: 100, padding: '3px 10px', marginBottom: 16
                }}>
                  <BsLightningCharge size={11} color={C.accent} />
                  <span style={{ fontSize: 12, color: C.accent, fontWeight: 600 }}>{plan.credits} Credits</span>
                </div>

                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 24 }}>{plan.description}</p>

                {/* Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                  {plan.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <FaCheckCircle size={14} color={C.accent} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {!plan.default && (
                  <motion.button
                    disabled={loadingPlan === plan.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) setSelectedPlan(plan.id)
                      else handlePayment(plan)
                    }}
                    style={{
                      width: '100%', padding: '13px 24px',
                      background: isSelected
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${isSelected ? 'transparent' : C.border}`,
                      borderRadius: 14, fontSize: 14, fontWeight: 700,
                      color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
                      cursor: loadingPlan === plan.id ? 'not-allowed' : 'pointer',
                      transition: 'all 0.25s ease',
                      opacity: loadingPlan === plan.id ? 0.7 : 1,
                      boxShadow: isSelected ? '0 0 24px rgba(16,185,129,0.3)' : 'none'
                    }}
                  >
                    {loadingPlan === plan.id
                      ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{
                              display: 'inline-block', width: 14, height: 14,
                              border: '2px solid rgba(255,255,255,0.3)',
                              borderTop: '2px solid #fff', borderRadius: '50%'
                            }}
                          /> Processing...
                        </span>
                      )
                      : isSelected ? 'Proceed to Pay' : 'Select Plan'
                    }
                  </motion.button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.2)', marginTop: 40 }}
        >
          All purchases are one-time. No subscriptions, no hidden fees.
        </motion.p>
      </div>
    </div>
  )
}

export default Pricing
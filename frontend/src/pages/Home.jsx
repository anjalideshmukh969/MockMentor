import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsStars,
  BsLightningCharge,
  BsShieldCheck
} from "react-icons/bs";
import {
  HiSparkles,
  HiMiniCpuChip
} from "react-icons/hi2";
import {
  FaBrain,
  FaMicrophoneAlt,
  FaChartLine,
  FaRocket
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';

import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

import Footer from '../components/Footer';

/* ─── Design tokens ──────────────────────────────────────────── */
const C = {
  bg: '#04080f',
  surface: 'rgba(255,255,255,0.04)',
  surfaceBright: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.07)',
  borderGreen: 'rgba(16,185,129,0.25)',
  accent: '#10b981',
  accentDim: 'rgba(16,185,129,0.15)',
  text: '#f0faf6',
  muted: 'rgba(255,255,255,0.42)',
  faint: 'rgba(255,255,255,0.14)',
}

const pill = (children, extra = {}) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)',
    borderRadius: 100, padding: '5px 14px',
    fontSize: 12, fontWeight: 600, color: C.accent, ...extra
  }}>{children}</span>
)

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  const guard = (path) => {
    if (!userData) { setShowAuth(true); return; }
    navigate(path)
  }

  return (
    <div style={{
      minHeight: '100vh', background: C.bg, color: C.text,
      fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      overflowX: 'hidden', position: 'relative'
    }}>

      {/* ── Ambient glow layers ──────────────────────────── */}
      <div style={{
        position: 'fixed', top: '-30%', left: '-20%',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-30%', right: '-20%',
        width: 900, height: 900,
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      {/* Subtle grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.faint} 1px,transparent 1px),linear-gradient(90deg,${C.faint} 1px,transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.18
      }} />

      <Navbar />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px 120px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 28 }}
          >
            {pill(<><HiMiniCpuChip size={13} />AI Engine Active</>)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{
              fontSize: 'clamp(40px, 7vw, 84px)',
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: '-2px',
              marginBottom: 24,
              color: '#fff'
            }}
          >
            Crack Interviews with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              AI Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{
              fontSize: 18, lineHeight: 1.75, color: C.muted,
              maxWidth: 600, margin: '0 auto 48px'
            }}
          >
            Next-generation AI interviews with adaptive questioning, voice analysis,
            resume intelligence, confidence tracking, and real-time evaluation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}
          >
            <motion.button
              onClick={() => guard("/interview")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '15px 36px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none', borderRadius: 100,
                fontSize: 15, fontWeight: 700, color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 0 32px rgba(16,185,129,0.35), 0 4px 16px rgba(0,0,0,0.3)'
              }}
            >
              <FaRocket size={14} /> Start AI Interview
            </motion.button>

            <motion.button
              onClick={() => guard("/history")}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '15px 36px',
                background: C.surfaceBright, backdropFilter: 'blur(12px)',
                border: `1px solid ${C.border}`, borderRadius: 100,
                fontSize: 15, fontWeight: 600, color: C.text,
                cursor: 'pointer'
              }}
            >
              View Analytics
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, maxWidth: 720, margin: '0 auto' }}>
            {[
              { value: "10K+", label: "AI Questions" },
              { value: "95%", label: "Accuracy Rate" },
              { value: "24/7", label: "AI Support" },
              { value: "5+", label: "Interview Modes" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -4, scale: 1.03 }}
                style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  borderRadius: 20, padding: '22px 16px',
                  backdropFilter: 'blur(12px)'
                }}
              >
                <div style={{ fontSize: 30, fontWeight: 800, color: C.accent, letterSpacing: '-1px' }}>{s.value}</div>
                <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PROCESS STEPS
        ════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#fff' }}>
              How It <span style={{ color: C.accent }}>Works</span>
            </h2>
          </motion.div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            gap: 24, alignItems: 'start'
          }}>
            {[
              { icon: <BsRobot size={22} />, step: "01", title: "Role & Experience", desc: "AI dynamically adjusts interview difficulty based on your role and experience level." },
              { icon: <BsMic size={22} />, step: "02", title: "Voice Interview", desc: "Real-time adaptive questions with intelligent AI-powered conversation flow." },
              { icon: <BsClock size={22} />, step: "03", title: "Smart Report", desc: "Detailed analytics, confidence scores, and actionable improvement feedback." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                style={{
                  background: C.surface, backdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`, borderRadius: 28,
                  padding: '36px 32px', position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Glow top-right */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 120, height: 120,
                  background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)',
                  borderRadius: '50%'
                }} />
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 52, height: 52,
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  borderRadius: 16, marginBottom: 20,
                  boxShadow: '0 0 20px rgba(16,185,129,0.3)'
                }}>
                  {React.cloneElement(item.icon, { color: '#fff' })}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>STEP {item.step}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.muted }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            AI CAPABILITIES
        ════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#fff' }}>
              Advanced AI <span style={{ color: C.accent }}>Capabilities</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
            {[
              { image: evalImg, icon: <BsBarChart size={18} />, title: "AI Answer Evaluation", desc: "Analyze technical accuracy, communication clarity, and confidence in real-time." },
              { image: resumeImg, icon: <BsFileEarmarkText size={18} />, title: "Resume Intelligence", desc: "AI generates personalized questions directly from your projects and skills." },
              { image: pdfImg, icon: <BsShieldCheck size={18} />, title: "Professional PDF Reports", desc: "Download detailed interview analytics with a comprehensive improvement roadmap." },
              { image: analyticsImg, icon: <BsLightningCharge size={18} />, title: "Live Performance Analytics", desc: "Track growth trends, strengths, weaknesses, and full interview history." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                style={{
                  background: C.surface, backdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`, borderRadius: 28,
                  padding: '32px', overflow: 'hidden', position: 'relative',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* shimmer */}
                <motion.div
                  animate={{ x: ['-120%', '220%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.04), transparent)',
                    transform: 'skewX(-12deg)'
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <img src={item.image} alt={item.title} style={{ width: '100%', maxHeight: 180, objectFit: 'contain' }} />
                  <div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 44, height: 44, background: C.accentDim,
                      border: `1px solid ${C.borderGreen}`,
                      borderRadius: 12, marginBottom: 12, color: C.accent
                    }}>{item.icon}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: C.muted }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            INTERVIEW MODES
        ════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 120px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#fff' }}>
              Multiple Interview <span style={{ color: C.accent }}>Modes</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 20 }}>
            {[
              { img: hrImg, title: "HR Interview Mode", desc: "Behavioral and communication-focused AI evaluation tailored for HR rounds." },
              { img: techImg, title: "Technical Mode", desc: "Role-specific deep technical assessments with adaptive difficulty." },
              { img: confidenceImg, title: "Confidence Detection", desc: "AI analyzes tone, hesitation, pacing, and speaking confidence in real-time." },
              { img: creditImg, title: "Smart Credit System", desc: "Unlock premium AI interviews and features with a transparent credit system." },
            ].map((mode, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  background: C.surface, backdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`, borderRadius: 28,
                  padding: '28px 32px',
                  display: 'flex', alignItems: 'center', gap: 20,
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{mode.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: C.muted }}>{mode.desc}</p>
                </div>
                <motion.img
                  src={mode.img}
                  alt={mode.title}
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            CTA BANNER
        ════════════════════════════════════════════════ */}
        <section style={{ padding: '0 24px 120px', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.06))',
              border: `1px solid ${C.borderGreen}`,
              borderRadius: 32, padding: '60px 40px',
              position: 'relative', overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)',
              borderRadius: '50%'
            }} />
            <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: 16 }}>
              Ready to ace your next interview?
            </h2>
            <p style={{ color: C.muted, fontSize: 16, marginBottom: 36 }}>
              Join thousands of candidates who've leveled up with MockMentor AI.
            </p>
            <motion.button
              onClick={() => guard("/interview")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 40px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none', borderRadius: 100,
                fontSize: 16, fontWeight: 700, color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 0 40px rgba(16,185,129,0.4)'
              }}
            >
              <FaRocket size={14} /> Start Free Interview
            </motion.button>
          </motion.div>
        </section>

      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home
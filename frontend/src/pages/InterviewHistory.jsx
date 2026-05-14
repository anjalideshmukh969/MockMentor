import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { motion } from "motion/react"
import { FaArrowLeft, FaCalendarAlt, FaChartLine, FaClock, FaStar } from 'react-icons/fa'
import { BsRobot, BsLightningCharge } from "react-icons/bs"

const C = {
  bg: '#04080f',
  surface: 'rgba(255,255,255,0.04)',
  surfaceBright: 'rgba(255,255,255,0.07)',
  border: 'rgba(255,255,255,0.07)',
  borderGreen: 'rgba(16,185,129,0.22)',
  accent: '#10b981',
  accentDim: 'rgba(16,185,129,0.12)',
  text: '#f0faf6',
  muted: 'rgba(255,255,255,0.42)',
  faint: 'rgba(255,255,255,0.14)',
}

function InterviewHistory() {
  const [interviews, setInterviews] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getMyInterviews = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/get-interview",
          { withCredentials: true }
        )
        setInterviews(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMyInterviews()
  }, [])

  const avgScore = interviews.length > 0
    ? (interviews.reduce((acc, item) => acc + (item.finalScore || 0), 0) / interviews.length).toFixed(1)
    : 0

  const getScoreColor = (score) => {
    if (score >= 8) return '#10b981'
    if (score >= 6) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: C.bg,
      color: C.text,
      fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient */}
      <div style={{
        position: 'fixed', top: '-25%', left: '-15%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-25%', right: '-15%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.faint} 1px,transparent 1px),linear-gradient(90deg,${C.faint} 1px,transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.12
      }} />

      <div style={{
        maxWidth: 960, margin: '0 auto',
        padding: '48px 24px',
        position: 'relative', zIndex: 1
      }}>

        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 56 }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <motion.button
              whileHover={{ scale: 1.08, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              style={{
                marginTop: 4, padding: 14,
                background: C.surface, border: `1px solid ${C.border}`,
                borderRadius: 14, cursor: 'pointer', color: C.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <FaArrowLeft size={15} />
            </motion.button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    padding: '10px', borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(16,185,129,0.3)'
                  }}
                >
                  <BsRobot size={18} color="white" />
                </motion.div>
                <h1 style={{ fontSize: 'clamp(28px,5vw,42px)', fontWeight: 900, letterSpacing: '-1px', color: '#fff' }}>
                  Interview History
                </h1>
              </div>
              <p style={{ fontSize: 15, color: C.muted }}>Track your AI interview performance and growth journey.</p>
            </div>
          </div>

          {/* Stats pill */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: C.surface, backdropFilter: 'blur(16px)',
              border: `1px solid ${C.border}`, borderRadius: 22,
              padding: '20px 28px',
              display: 'flex', alignItems: 'center', gap: 28
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: C.accent }}>{interviews.length}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Interviews</div>
            </div>
            <div style={{ width: 1, height: 40, background: C.border }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: getScoreColor(Number(avgScore)) }}>{avgScore}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Avg Score</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Empty state ─────────────────────────────────── */}
        {interviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: C.surface, backdropFilter: 'blur(16px)',
              border: `1px solid ${C.border}`, borderRadius: 32,
              padding: '80px 40px', textAlign: 'center'
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 0 40px rgba(16,185,129,0.3)'
              }}
            >
              <BsLightningCharge size={32} color="white" />
            </motion.div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>No Interviews Yet</h2>
            <p style={{ color: C.muted, fontSize: 15, marginBottom: 32 }}>Start your first AI interview and track your progress here.</p>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              style={{
                padding: '13px 32px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none', borderRadius: 100,
                fontSize: 15, fontWeight: 700, color: '#fff',
                cursor: 'pointer', boxShadow: '0 0 24px rgba(16,185,129,0.3)'
              }}
            >
              Start Interview
            </motion.button>
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {interviews.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/report/${item._id}`)}
                style={{
                  background: C.surface, backdropFilter: 'blur(16px)',
                  border: `1px solid ${C.border}`,
                  borderRadius: 24, padding: '28px 32px',
                  cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.borderGreen
                  e.currentTarget.style.boxShadow = '0 0 32px rgba(16,185,129,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Glow */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 160, height: 160,
                  background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)',
                  borderRadius: '50%', pointerEvents: 'none'
                }} />

                <div style={{
                  display: 'flex', flexWrap: 'wrap',
                  alignItems: 'center', justifyContent: 'space-between', gap: 20,
                  position: 'relative', zIndex: 1
                }}>
                  {/* Left */}
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                      <div style={{
                        width: 40, height: 40,
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 14px rgba(16,185,129,0.3)'
                      }}>
                        <FaChartLine size={14} color="white" />
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{item.role}</h3>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 10 }}>
                      {[
                        { icon: <FaStar size={11} />, text: item.experience },
                        { icon: <BsRobot size={11} />, text: item.mode },
                        { icon: <FaCalendarAlt size={11} />, text: new Date(item.createdAt).toLocaleDateString() },
                      ].map((tag, ti) => (
                        <span key={ti} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 12, color: C.muted
                        }}>
                          <span style={{ color: C.accent }}>{tag.icon}</span>{tag.text}
                        </span>
                      ))}
                    </div>

                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                      AI-powered session with smart evaluation, adaptive questioning and performance analysis.
                    </p>
                  </div>

                  {/* Right */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    {/* Score */}
                    <div style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      borderRadius: 20, padding: '16px 24px', textAlign: 'center',
                      minWidth: 110, boxShadow: '0 0 24px rgba(16,185,129,0.25)'
                    }}>
                      <div style={{ fontSize: 26, fontWeight: 800, color: '#fff' }}>
                        {item.finalScore || 0}/10
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 }}>Overall Score</div>
                    </div>

                    {/* Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span style={{
                        padding: '5px 14px', borderRadius: 100, fontSize: 12, fontWeight: 600,
                        background: item.status === 'completed' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                        color: item.status === 'completed' ? '#10b981' : '#f59e0b',
                        border: `1px solid ${item.status === 'completed' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                        textAlign: 'center'
                      }}>
                        {item.status}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.muted, fontSize: 11 }}>
                        <FaClock size={10} /> AI Generated Report
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default InterviewHistory
import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Timer({ timeLeft, totalTime }) {
  const percentage = (timeLeft / totalTime) * 100
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Color transitions based on urgency
  const getColors = () => {
    if (percentage > 50) return { stroke: '#10b981', glow: 'rgba(16,185,129,0.4)', text: '#10b981' }
    if (percentage > 25) return { stroke: '#f59e0b', glow: 'rgba(245,158,11,0.4)', text: '#f59e0b' }
    return { stroke: '#ef4444', glow: 'rgba(239,68,68,0.45)', text: '#ef4444' }
  }

  const colors = getColors()
  const isUrgent = percentage <= 25

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: '96px', height: '96px' }}
    >
      {/* Pulsing glow ring (only when urgent) */}
      <AnimatePresence>
        {isUrgent && (
          <motion.div
            key="urgency-pulse"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0.5, 0.15, 0.5], scale: [1, 1.18, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
              filter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* SVG circular track */}
      <svg
        width="96"
        height="96"
        viewBox="0 0 96 96"
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        {/* Glow filter */}
        <defs>
          <filter id="timer-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Dim outer ring */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Active progress arc */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset, stroke: colors.stroke }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          filter="url(#timer-glow)"
          style={{ strokeDashoffset }}
        />
      </svg>

      {/* Center glass card */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.06) 0%, rgba(10,10,20,0.85) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Time digits */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={timeLeft}
            initial={{ opacity: 0, y: -6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              fontSize: timeLeft >= 100 ? '13px' : '17px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: colors.text,
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              filter: `drop-shadow(0 0 6px ${colors.glow})`,
            }}
          >
            {timeLeft}
          </motion.span>
        </AnimatePresence>

        {/* "sec" label */}
        <span
          style={{
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '2px',
            textTransform: 'uppercase',
          }}
        >
          sec
        </span>
      </div>
    </div>
  )
}

export default Timer
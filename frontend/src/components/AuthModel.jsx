import React from 'react'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import Auth from '../pages/Auth'

const AuthModal = ({ onClose }) => {
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (userData) {
      onClose()
    }
  }, [userData, onClose])

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="auth-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999] flex items-center justify-center px-4"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.13) 0%, rgba(0,0,0,0.72) 70%)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        {/* Floating ambient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
            filter: 'blur(48px)',
            animation: 'floatOrb1 7s ease-in-out infinite alternate',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-1/4 right-1/4 w-56 h-56 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            filter: 'blur(40px)',
            animation: 'floatOrb2 9s ease-in-out infinite alternate',
          }}
        />

        {/* Modal card */}
        <motion.div
          key="auth-modal-card"
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-md"
          style={{
            borderRadius: '20px',
            background:
              'linear-gradient(145deg, rgba(17,17,27,0.97) 0%, rgba(23,23,43,0.95) 100%)',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow:
              '0 0 0 1px rgba(99,102,241,0.1), 0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.08)',
          }}
        >
          {/* Top glow line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(139,92,246,0.7), rgba(99,102,241,0.9), rgba(139,92,246,0.7), transparent)',
              borderRadius: '999px',
            }}
          />

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99,102,241,0.2)'
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
            }}
          >
            <FaTimes size={14} />
          </motion.button>

          {/* Auth content */}
          <Auth isModel={true} />
        </motion.div>
      </motion.div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, -30px) scale(1.12); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-30px, 40px) scale(1.08); }
        }
      `}</style>
    </AnimatePresence>
  )
}

export default AuthModal
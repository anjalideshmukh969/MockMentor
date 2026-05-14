import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }

  return (
    <div className={`
      w-full font-[system-ui]
      ${isModel ? "py-4" : "min-h-screen flex items-center justify-center px-6 py-20"}
    `}
      style={!isModel ? {
        background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 40%, #0a1628 100%)',
        position: 'relative',
        overflow: 'hidden'
      } : {}}
    >
      {/* Background effects for full page */}
      {!isModel && (
        <>
          <div style={{
            position: 'absolute', top: '-20%', left: '-10%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute', bottom: '-20%', right: '-10%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(40px)'
          }} />
          {/* Grid pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: -32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full relative z-10 ${isModel ? "max-w-md" : "max-w-md mx-auto"}`}
        style={{
          background: isModel
            ? 'rgba(255,255,255,0.98)'
            : 'rgba(15,20,30,0.85)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${isModel ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '28px',
          padding: isModel ? '40px' : '52px',
          boxShadow: isModel
            ? '0 32px 64px rgba(0,0,0,0.12)'
            : '0 0 0 1px rgba(16,185,129,0.1), 0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)'
        }}
      >

        {/* style="background: linear-gradient(135deg, rgb(99, 102, 241), rgb(139, 92, 246)); box-shadow: 
        rgba(99, 102, 241, 0.35) 0px 4px 20px; transform: none;" */}
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className='flex items-center justify-center gap-3 mb-8'
        >
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            padding: '10px',
            borderRadius: '14px',
            boxShadow: '0 0 20px rgba(16,185,129,0.4)'
          }}>
            <BsRobot size={20} color="white" />
          </div>
          <span style={{
            fontWeight: 700,
            fontSize: '18px',
            color: isModel ? '#111' : '#fff',
            letterSpacing: '-0.3px'
          }}>MockMentor</span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-center mb-3'
        >
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            lineHeight: 1.2,
            color: isModel ? '#111827' : '#f9fafb',
            letterSpacing: '-0.5px',
            marginBottom: '8px'
          }}>
            Start Your AI Interview
          </h1>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.08))',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '100px',
            padding: '6px 14px',
            marginTop: '8px'
          }}>
            <IoSparkles size={13} color="#10b981" />
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>AI-Powered Practice</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            textAlign: 'center',
            fontSize: '14px',
            lineHeight: 1.7,
            color: isModel ? '#6b7280' : 'rgba(255,255,255,0.45)',
            marginBottom: '32px'
          }}
        >
          Sign in to unlock AI mock interviews, detailed performance insights, and your growth journey.
        </motion.p>

        {/* Google Button */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '14px 24px',
            background: isModel
              ? '#fff'
              : 'rgba(255,255,255,0.05)',
            border: isModel
              ? '1.5px solid rgba(0,0,0,0.12)'
              : '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: 600,
            color: isModel ? '#111' : '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: isModel ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
            marginBottom: '12px'
          }}
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: isModel ? '#9ca3af' : 'rgba(255,255,255,0.25)',
          marginTop: '16px'
        }}>
          By continuing, you agree to our Terms of Service
        </p>
      </motion.div>
    </div>
  )
}

export default Auth
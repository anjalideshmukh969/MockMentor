import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs"
import { IoSparkles } from "react-icons/io5"
import { motion, AnimatePresence } from "motion/react"
import { FcGoogle } from "react-icons/fc"
import { MdEmail, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { ServerUrl } from '../config/config'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Auth({ isModel = false }) {
    const dispatch = useDispatch()

    // ── UI state ──
    const [mode, setMode] = useState('login')       // 'login' | 'signup'
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // ── Form fields ──
    const [form, setForm] = useState({ name: '', email: '', password: '' })

    const handleChange = (e) => {
        setError('')
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // ── Google sign-in (original logic, unchanged) ──
    const handleGoogleAuth = async () => {
        try {
            setLoading(true)
            setError('')
            const response = await signInWithPopup(auth, provider)
            const User = response.user
            const result = await axios.post(
                ServerUrl + "/api/auth/google",
                { name: User.displayName, email: User.email },
                { withCredentials: true }
            )
            dispatch(setUserData(result.data))
        } catch (err) {
            console.log(err)
            setError('Google sign-in failed. Please try again.')
            dispatch(setUserData(null))
        } finally {
            setLoading(false)
        }
    }

    // ── Email / password auth ──
    const handleEmailAuth = async (e) => {
        e.preventDefault()
        setError('')

        if (!form.email || !form.password) { setError('Please fill in all required fields.'); return }
        if (mode === 'signup' && !form.name.trim()) { setError('Please enter your full name.'); return }
        if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

        try {
            setLoading(true)
            const endpoint = mode === 'signup' ? '/api/auth/register' : '/api/auth/login'
            const payload = mode === 'signup'
                ? { name: form.name, email: form.email, password: form.password }
                : { email: form.email, password: form.password }

            const result = await axios.post(ServerUrl + endpoint, payload, { withCredentials: true })
            dispatch(setUserData(result.data))
        } catch (err) {
            console.log(err)
            const msg = err?.response?.data?.message
            setError(msg || (mode === 'signup' ? 'Registration failed. Try again.' : 'Invalid email or password.'))
        } finally {
            setLoading(false)
        }
    }

    const switchMode = (newMode) => {
        setMode(newMode)
        setError('')
        setForm({ name: '', email: '', password: '' })
    }

    // ── Shared style helpers ──
    const isLight = isModel
    const textPrimary   = isLight ? '#111827'             : '#fff'
    const textMuted     = isLight ? '#6b7280'             : 'rgba(255,255,255,0.38)'
    const borderBase    = isLight ? 'rgba(0,0,0,0.1)'     : 'rgba(255,255,255,0.08)'
    const inputBg       = isLight ? 'rgba(0,0,0,0.03)'    : 'rgba(255,255,255,0.05)'
    const inputBorder   = isLight ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.2)'
    const iconCol       = isLight ? '#6366f1'             : 'rgba(99,102,241,0.7)'
    const labelCol      = isLight ? '#6b7280'             : 'rgba(255,255,255,0.42)'

    const inputStyle = {
        width: '100%',
        padding: '11px 14px 11px 40px',
        borderRadius: '12px',
        background: inputBg,
        border: `1px solid ${inputBorder}`,
        color: textPrimary,
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s',
    }

    return (
        <div
            className={`w-full ${isModel ? "py-4" : "min-h-screen flex items-center justify-center px-6 py-16"}`}
            style={!isModel ? { background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' } : {}}
        >
            {/* ── Full-page background effects (unchanged) ── */}
            {!isModel && (
                <>
                    <div className='fixed inset-0 pointer-events-none' style={{
                        backgroundImage: `linear-gradient(rgba(99,102,241,0.045) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(99,102,241,0.045) 1px, transparent 1px)`,
                        backgroundSize: '52px 52px',
                    }} />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.14, 0.07] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className='fixed top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(70px)' }}
                    />
                    <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className='fixed bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none'
                        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', filter: 'blur(55px)' }}
                    />
                </>
            )}

            {/* ── Card ── */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full overflow-hidden ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-10 rounded-[32px]"}`}
                style={!isModel ? {
                    background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(18,18,42,0.97) 100%)',
                    border: '1px solid rgba(99,102,241,0.22)',
                    boxShadow: '0 0 0 1px rgba(99,102,241,0.08), 0 40px 100px rgba(0,0,0,0.8)',
                } : {}}
            >
                {/* Top glow line */}
                {!isModel && (
                    <div style={{
                        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(99,102,241,0.8), transparent)',
                    }} />
                )}

                {/* Logo row */}
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className='p-2.5 rounded-xl text-white'
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.45)' }}
                    >
                        <BsRobot size={18} />
                    </motion.div>
                    <h2 className='font-bold text-lg' style={{ color: textPrimary }}>MockMentor</h2>
                </div>

                {/* Headline */}
                <h1 className='text-2xl font-bold text-center leading-snug mb-2' style={{ color: textPrimary, letterSpacing: '-0.4px' }}>
                    {mode === 'login' ? 'Welcome back' : 'Create your account'}
                    {' '}
                    <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold align-middle'
                        style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.28)', color: '#a5b4fc' }}>
                        <IoSparkles size={11} />
                        AI Smart Interview
                    </span>
                </h1>

                <p className='text-center text-sm leading-relaxed mb-7' style={{ color: textMuted }}>
                    {mode === 'login'
                        ? 'Sign in to continue your AI interview journey.'
                        : 'Join thousands who are acing their interviews with AI.'}
                </p>

                {/* ── Login / Signup tab toggle ── */}
                <div
                    className='flex rounded-2xl p-1 mb-6 gap-1'
                    style={{ background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', border: `1px solid ${borderBase}` }}
                >
                    {['login', 'signup'].map(m => (
                        <button
                            key={m}
                            onClick={() => switchMode(m)}
                            className='flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300'
                            style={mode === m ? {
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff',
                                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
                            } : {
                                color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.35)',
                                background: 'transparent',
                            }}
                        >
                            {m === 'login' ? 'Sign In' : 'Sign Up'}
                        </button>
                    ))}
                </div>

                {/* ── Google button ── */}
                <motion.button
                    onClick={handleGoogleAuth}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    className='w-full flex items-center justify-center gap-3 py-3 rounded-2xl font-semibold text-sm relative overflow-hidden mb-5'
                    style={{
                        background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)',
                        border: `1px solid ${borderBase}`,
                        color: isLight ? '#374151' : '#fff',
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={e => {
                        if (!loading) {
                            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)'
                            e.currentTarget.style.background = 'rgba(99,102,241,0.09)'
                            e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.15)'
                        }
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.borderColor = borderBase
                        e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)'
                        e.currentTarget.style.boxShadow = 'none'
                    }}
                >
                    <motion.div
                        animate={{ x: ['-100%', '250%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        className='absolute inset-0 skew-x-12 w-1/3 pointer-events-none'
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    />
                    <FcGoogle size={20} />
                    <span className='relative z-10'>Continue with Google</span>
                </motion.button>

                {/* ── Divider ── */}
                <div className='flex items-center gap-3 mb-5'>
                    <div className='flex-1 h-px' style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }} />
                    <span className='text-xs font-medium' style={{ color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.22)' }}>
                        or with email
                    </span>
                    <div className='flex-1 h-px' style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)' }} />
                </div>

                {/* ── Email/password form ── */}
                <form onSubmit={handleEmailAuth} className='space-y-4' autoComplete="off">

                    {/* Name — signup only, animated in/out */}
                    <AnimatePresence initial={false}>
                        {mode === 'signup' && (
                            <motion.div
                                key="name-field"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className='pb-0'>
                                    <label className='block text-xs font-semibold uppercase tracking-widest mb-1.5'
                                        style={{ color: labelCol }}>
                                        Full Name
                                    </label>
                                    <div className='relative'>
                                        <MdPerson size={16} className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
                                            style={{ color: iconCol }} />
                                        <input
                                            type='text' name='name' value={form.name}
                                            onChange={handleChange} placeholder='John Doe'
                                            style={inputStyle}
                                            onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = 'rgba(99,102,241,0.07)' }}
                                            onBlur={e => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = 'none'; e.target.style.background = inputBg }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Email */}
                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-widest mb-1.5'
                            style={{ color: labelCol }}>
                            Email Address
                        </label>
                        <div className='relative'>
                            <MdEmail size={16} className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
                                style={{ color: iconCol }} />
                            <input
                                type='email' name='email' value={form.email}
                                onChange={handleChange} placeholder='you@example.com'
                                style={inputStyle}
                                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = 'rgba(99,102,241,0.07)' }}
                                onBlur={e => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = 'none'; e.target.style.background = inputBg }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-xs font-semibold uppercase tracking-widest mb-1.5'
                            style={{ color: labelCol }}>
                            Password
                        </label>
                        <div className='relative'>
                            <MdLock size={16} className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
                                style={{ color: iconCol }} />
                            <input
                                type={showPassword ? 'text' : 'password'} name='password' value={form.password}
                                onChange={handleChange} placeholder='Min. 6 characters'
                                style={{ ...inputStyle, paddingRight: '40px' }}
                                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)'; e.target.style.background = 'rgba(99,102,241,0.07)' }}
                                onBlur={e => { e.target.style.borderColor = inputBorder; e.target.style.boxShadow = 'none'; e.target.style.background = inputBg }}
                            />
                            <button type='button' onClick={() => setShowPassword(p => !p)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 transition-colors'
                                style={{ color: iconCol, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                {showPassword ? <MdVisibilityOff size={16} /> : <MdVisibility size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Error toast */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: -6, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, y: -4, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className='text-sm px-4 py-2.5 rounded-xl'
                                style={{
                                    background: 'rgba(239,68,68,0.08)',
                                    border: '1px solid rgba(239,68,68,0.22)',
                                    color: '#f87171',
                                }}
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                        type='submit'
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        className='w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white relative overflow-hidden'
                        style={{
                            background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            boxShadow: loading ? 'none' : '0 6px 28px rgba(99,102,241,0.42)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {!loading && (
                            <motion.div
                                animate={{ x: ['-100%', '250%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                className='absolute inset-0 skew-x-12 w-1/3 pointer-events-none'
                                style={{ background: 'rgba(255,255,255,0.1)' }}
                            />
                        )}
                        <span className='relative z-10 flex items-center gap-2'>
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                                        className='w-4 h-4 rounded-full flex-shrink-0'
                                        style={{ border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                                    />
                                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                                </>
                            ) : (
                                mode === 'login' ? 'Sign In' : 'Create Account'
                            )}
                        </span>
                    </motion.button>
                </form>

                {/* Switch mode link */}
                <p className='text-center text-xs mt-5' style={{ color: isLight ? '#9ca3af' : 'rgba(255,255,255,0.28)' }}>
                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                        className='font-semibold transition-colors'
                        style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
                        onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}
                    >
                        {mode === 'login' ? 'Sign up free →' : '← Sign in'}
                    </button>
                </p>

                <p className='text-center text-xs mt-3' style={{ color: isLight ? '#d1d5db' : 'rgba(255,255,255,0.13)' }}>
                    By continuing you agree to our Terms &amp; Privacy Policy
                </p>
            </motion.div>
        </div>
    )
}

export default Auth
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"
import { BsArrowRight, BsRobot } from 'react-icons/bs'
import axios from "axios"
import { ServerUrl } from '../App'

function Step2({ interviewData, onFinish }) {
    const { interviewId, questions, userName } = interviewData
    const [isIntroPhase, setIsIntroPhase] = useState(true)
    const [isMicOn, setIsMicOn] = useState(true)
    const recognitionRef = useRef(null)
    const [isAIPlaying, setIsAIPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answer, setAnswer] = useState("")
    const [feedback, setFeedback] = useState("")
    const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60)
    const [selectedVoice, setSelectedVoice] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [voiceGender, setVoiceGender] = useState("female")
    const [subtitle, setSubtitle] = useState("")
    const videoRef = useRef(null)
    const currentQuestion = questions[currentIndex]

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            if (!voices.length) return
            const femaleVoice = voices.find(v =>
                v.name.toLowerCase().includes("zira") ||
                v.name.toLowerCase().includes("samantha") ||
                v.name.toLowerCase().includes("female")
            )
            if (femaleVoice) { setSelectedVoice(femaleVoice); setVoiceGender("female"); return }
            const maleVoice = voices.find(v =>
                v.name.toLowerCase().includes("david") ||
                v.name.toLowerCase().includes("mark") ||
                v.name.toLowerCase().includes("male")
            )
            if (maleVoice) { setSelectedVoice(maleVoice); setVoiceGender("male"); return }
            setSelectedVoice(voices[0]); setVoiceGender("female")
        }
        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
    }, [])

    const videoSource = voiceGender === "male" ? maleVideo : femaleVideo

    const speakText = (text) => {
        return new Promise((resolve) => {
            if (!window.speechSynthesis || !selectedVoice) { resolve(); return }
            window.speechSynthesis.cancel()
            const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ")
            const utterance = new SpeechSynthesisUtterance(humanText)
            utterance.voice = selectedVoice
            utterance.rate = 0.92
            utterance.pitch = 1.05
            utterance.volume = 1
            utterance.onstart = () => { setIsAIPlaying(true); stopMic(); videoRef.current?.play() }
            utterance.onend = () => {
                videoRef.current?.pause()
                videoRef.current.currentTime = 0
                setIsAIPlaying(false)
                if (isMicOn) startMic()
                setTimeout(() => { setSubtitle(""); resolve() }, 300)
            }
            setSubtitle(text)
            window.speechSynthesis.speak(utterance)
        })
    }

    useEffect(() => {
        if (!selectedVoice) return
        const runIntro = async () => {
            if (isIntroPhase) {
                await speakText(`Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`)
                await speakText("I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.")
                setIsIntroPhase(false)
            } else if (currentQuestion) {
                await new Promise(r => setTimeout(r, 800))
                if (currentIndex === questions.length - 1) {
                    await speakText("Alright, this one might be a bit more challenging.")
                }
                await speakText(currentQuestion.question)
                if (isMicOn) startMic()
            }
        }
        runIntro()
    }, [selectedVoice, isIntroPhase, currentIndex])

    useEffect(() => {
        if (isIntroPhase || !currentQuestion) return
        const timer = setInterval(() => {
            setTimeLeft((prev) => { if (prev <= 1) { clearInterval(timer); return 0 } return prev - 1 })
        }, 1000)
        return () => clearInterval(timer)
    }, [isIntroPhase, currentIndex])

    useEffect(() => {
        if (!isIntroPhase && currentQuestion) setTimeLeft(currentQuestion.timeLimit || 60)
    }, [currentIndex])

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) return
        const recognition = new window.webkitSpeechRecognition()
        recognition.lang = "en-US"
        recognition.continuous = true
        recognition.interimResults = false
        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript
            setAnswer((prev) => prev + " " + transcript)
        }
        recognitionRef.current = recognition
    }, [])

    const startMic = () => { if (recognitionRef.current && !isAIPlaying) { try { recognitionRef.current.start() } catch { } } }
    const stopMic = () => { if (recognitionRef.current) recognitionRef.current.stop() }
    const toggleMic = () => { if (isMicOn) stopMic(); else startMic(); setIsMicOn(!isMicOn) }

    const submitAnswer = async () => {
        if (isSubmitting) return
        stopMic()
        setIsSubmitting(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
                interviewId, questionIndex: currentIndex, answer,
                timeTaken: currentQuestion.timeLimit - timeLeft,
            }, { withCredentials: true })
            setFeedback(result.data.feedback)
            speakText(result.data.feedback)
            setIsSubmitting(false)
        } catch (error) {
            console.log(error)
            setIsSubmitting(false)
        }
    }

    const handleNext = async () => {
        setAnswer(""); setFeedback("")
        if (currentIndex + 1 >= questions.length) { finishInterview(); return }
        await speakText("Alright, let's move to the next question.")
        setCurrentIndex(currentIndex + 1)
        setTimeout(() => { if (isMicOn) startMic() }, 500)
    }

    const finishInterview = async () => {
        stopMic(); setIsMicOn(false)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })
            onFinish(result.data)
        } catch (error) { console.log(error) }
    }

    useEffect(() => {
        if (!isIntroPhase && currentQuestion && timeLeft === 0 && !isSubmitting && !feedback) submitAnswer()
    }, [timeLeft])

    useEffect(() => {
        return () => {
            if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current.abort() }
            window.speechSynthesis.cancel()
        }
    }, [])

    return (
        <div className='min-h-screen flex items-center justify-center p-4 sm:p-6'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

            {/* Ambient orbs */}
            <div className='fixed top-1/4 left-1/6 w-72 h-72 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className='fixed bottom-1/4 right-1/6 w-56 h-56 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div className='w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden'
                style={{
                    background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    borderRadius: '24px',
                    boxShadow: '0 0 0 1px rgba(99,102,241,0.06), 0 40px 100px rgba(0,0,0,0.8)',
                    minHeight: '80vh',
                }}
            >
                {/* Top glow line */}
                <div style={{
                    position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(139,92,246,0.8), rgba(99,102,241,0.7), transparent)',
                }} />

                {/* LEFT — Video + Timer */}
                <div className='w-full lg:w-[36%] flex flex-col items-center p-6 gap-5'
                    style={{ borderRight: '1px solid rgba(99,102,241,0.12)' }}>

                    {/* Video frame */}
                    <div className='w-full max-w-sm rounded-2xl overflow-hidden relative'
                        style={{
                            border: '1px solid rgba(99,102,241,0.2)',
                            boxShadow: isAIPlaying ? '0 0 40px rgba(99,102,241,0.3)' : '0 0 20px rgba(0,0,0,0.5)',
                            transition: 'box-shadow 0.4s',
                        }}>
                        <video src={videoSource} key={videoSource} ref={videoRef}
                            muted playsInline preload="auto"
                            className="w-full h-auto object-cover" />

                        {/* AI Speaking badge */}
                        <AnimatePresence>
                            {isAIPlaying && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    className='absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full'
                                    style={{ background: 'rgba(99,102,241,0.85)', backdropFilter: 'blur(8px)' }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className='w-2 h-2 rounded-full bg-white'
                                    />
                                    <span className='text-white text-xs font-semibold'>AI Speaking</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Subtitle */}
                    <AnimatePresence>
                        {subtitle && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className='w-full max-w-sm rounded-2xl p-4'
                                style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}
                            >
                                <p className='text-sm font-medium text-center leading-relaxed' style={{ color: 'rgba(255,255,255,0.75)' }}>
                                    {subtitle}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Timer card */}
                    <div className='w-full max-w-sm rounded-2xl p-6 space-y-5'
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(99,102,241,0.15)' }}>

                        <div className='flex justify-between items-center'>
                            <span className='text-sm' style={{ color: 'rgba(255,255,255,0.4)' }}>Interview Status</span>
                            {isAIPlaying && (
                                <span className='text-xs font-semibold px-3 py-1 rounded-full'
                                    style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>
                                    AI Speaking
                                </span>
                            )}
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                        <div className='flex justify-center'>
                            <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
                        </div>

                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                        <div className='grid grid-cols-2 gap-4 text-center'>
                            <div className='rounded-xl p-3' style={{ background: 'rgba(99,102,241,0.08)' }}>
                                <span className='text-2xl font-bold block' style={{
                                    background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    {currentIndex + 1}
                                </span>
                                <span className='text-xs' style={{ color: 'rgba(255,255,255,0.35)' }}>Current Q</span>
                            </div>
                            <div className='rounded-xl p-3' style={{ background: 'rgba(99,102,241,0.08)' }}>
                                <span className='text-2xl font-bold block' style={{
                                    background: 'linear-gradient(135deg, #818cf8, #a78bfa)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                }}>
                                    {questions.length}
                                </span>
                                <span className='text-xs' style={{ color: 'rgba(255,255,255,0.35)' }}>Total Qs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Question + Answer */}
                <div className='flex-1 flex flex-col p-6 sm:p-8 relative'>

                    {/* Header */}
                    <div className='flex items-center gap-3 mb-6'>
                        <div className='p-2 rounded-xl' style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 16px rgba(99,102,241,0.35)' }}>
                            <BsRobot size={18} className='text-white' />
                        </div>
                        <h2 className='text-xl sm:text-2xl font-bold' style={{ color: '#fff', letterSpacing: '-0.3px' }}>
                            AI Smart Interview
                        </h2>
                        {/* Progress dots */}
                        <div className='ml-auto flex gap-1.5'>
                            {questions.map((_, i) => (
                                <div key={i} className='rounded-full transition-all duration-300'
                                    style={{
                                        width: i === currentIndex ? '20px' : '8px',
                                        height: '8px',
                                        background: i <= currentIndex
                                            ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                            : 'rgba(255,255,255,0.12)',
                                    }} />
                            ))}
                        </div>
                    </div>

                    {/* Question box */}
                    {!isIntroPhase && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className='relative mb-5 p-5 sm:p-6 rounded-2xl'
                            style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}
                        >
                            {/* Glow line */}
                            <div style={{
                                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)',
                            }} />
                            <p className='text-xs mb-2' style={{ color: 'rgba(255,255,255,0.35)' }}>
                                Question {currentIndex + 1} of {questions.length}
                            </p>
                            <p className='text-base sm:text-lg font-semibold leading-relaxed' style={{ color: 'rgba(255,255,255,0.9)' }}>
                                {currentQuestion?.question}
                            </p>
                        </motion.div>
                    )}

                    {/* Answer textarea */}
                    <textarea
                        placeholder="Type your answer here, or speak using the microphone..."
                        onChange={(e) => setAnswer(e.target.value)}
                        value={answer}
                        className="flex-1 p-5 sm:p-6 rounded-2xl resize-none outline-none transition-all text-sm sm:text-base"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(99,102,241,0.18)',
                            color: 'rgba(255,255,255,0.85)',
                            minHeight: '160px',
                            fontFamily: 'inherit',
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.45)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(99,102,241,0.18)'; e.target.style.boxShadow = 'none' }}
                    />

                    {/* Controls */}
                    {!feedback ? (
                        <div className='flex items-center gap-4 mt-5'>
                            {/* Mic button */}
                            <motion.button
                                onClick={toggleMic}
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.06 }}
                                className='w-13 h-13 flex items-center justify-center rounded-full text-white transition-all'
                                style={{
                                    width: '52px', height: '52px',
                                    background: isMicOn
                                        ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                        : 'rgba(255,255,255,0.07)',
                                    border: isMicOn ? 'none' : '1px solid rgba(255,255,255,0.12)',
                                    boxShadow: isMicOn ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                                }}
                            >
                                {isMicOn
                                    ? <FaMicrophone size={18} />
                                    : <FaMicrophoneSlash size={18} style={{ color: 'rgba(255,255,255,0.4)' }} />
                                }
                            </motion.button>

                            {/* Submit button */}
                            <motion.button
                                onClick={submitAnswer}
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.96 }}
                                className='flex-1 py-3.5 sm:py-4 rounded-2xl font-bold text-white transition-all relative overflow-hidden'
                                style={{
                                    background: isSubmitting ? 'rgba(255,255,255,0.07)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(99,102,241,0.4)',
                                }}
                            >
                                {isSubmitting ? (
                                    <span className='flex items-center justify-center gap-2'>
                                        <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full' />
                                        Submitting...
                                    </span>
                                ) : "Submit Answer"}
                            </motion.button>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='mt-5 p-5 rounded-2xl'
                            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.25)' }}
                        >
                            {/* Glow line */}
                            <div style={{
                                position: 'absolute', left: '20%', right: '20%', height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)',
                                marginTop: '-20px',
                            }} />
                            <p className='text-xs font-semibold mb-2' style={{ color: '#818cf8' }}>AI Feedback</p>
                            <p className='text-sm leading-relaxed mb-4' style={{ color: 'rgba(255,255,255,0.75)' }}>{feedback}</p>

                            <motion.button
                                onClick={handleNext}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className='w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2'
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                                }}
                            >
                                {currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}
                                <BsArrowRight size={16} />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Step2
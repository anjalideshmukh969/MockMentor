import React from 'react'
import { FaArrowLeft, FaDownload } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div style={{
                background: 'rgba(12,12,28,0.95)',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '12px',
                padding: '10px 14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}>
                <p style={{ color: '#a5b4fc', fontWeight: 700, fontSize: '13px' }}>{label}</p>
                <p style={{ color: '#fff', fontSize: '13px' }}>Score: <strong>{payload[0].value}/10</strong></p>
            </div>
        )
    }
    return null
}

function Step3Report({ report }) {
    if (!report) {
        return (
            <div className="min-h-screen flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 100%)' }}>
                <div className='flex flex-col items-center gap-4'>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className='w-14 h-14 rounded-full border-4'
                        style={{ borderColor: 'rgba(99,102,241,0.2)', borderTopColor: '#6366f1' }}
                    />
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Generating your report...</p>
                </div>
            </div>
        )
    }

    const navigate = useNavigate()
    const { finalScore = 0, confidence = 0, communication = 0, correctness = 0, questionWiseScore = [] } = report

    const questionScoreData = questionWiseScore.map((score, index) => ({
        name: `Q${index + 1}`,
        score: score.score || 0,
    }))

    const skills = [
        { label: "Confidence", value: confidence },
        { label: "Communication", value: communication },
        { label: "Correctness", value: correctness },
    ]

    let performanceText = "", shortTagline = ""
    if (finalScore >= 8) {
        performanceText = "Ready for job opportunities."
        shortTagline = "Excellent clarity and structured responses."
    } else if (finalScore >= 5) {
        performanceText = "Needs minor improvement before interviews."
        shortTagline = "Good foundation, refine articulation."
    } else {
        performanceText = "Significant improvement required."
        shortTagline = "Work on clarity and confidence."
    }

    const scoreColor = finalScore >= 8 ? '#10b981' : finalScore >= 5 ? '#f59e0b' : '#ef4444'
    const percentage = (finalScore / 10) * 100

    const downloadPDF = () => {
        const doc = new jsPDF("p", "mm", "a4")
        const pageWidth = doc.internal.pageSize.getWidth()
        const margin = 20
        const contentWidth = pageWidth - margin * 2
        let currentY = 25

        doc.setFont("helvetica", "bold")
        doc.setFontSize(20)
        doc.setTextColor(99, 102, 241)
        doc.text("AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" })
        currentY += 5
        doc.setDrawColor(99, 102, 241)
        doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2)
        currentY += 15

        doc.setFillColor(240, 240, 255)
        doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F")
        doc.setFontSize(14)
        doc.setTextColor(0, 0, 0)
        doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, { align: "center" })
        currentY += 30

        doc.setFillColor(249, 250, 251)
        doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F")
        doc.setFontSize(12)
        doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10)
        doc.text(`Communication: ${communication}`, margin + 10, currentY + 18)
        doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26)
        currentY += 45

        let advice = finalScore >= 8
            ? "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples."
            : finalScore >= 5
                ? "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples."
                : "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly."

        doc.setFillColor(255, 255, 255)
        doc.setDrawColor(220)
        doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4)
        doc.setFont("helvetica", "bold")
        doc.text("Professional Advice", margin + 10, currentY + 10)
        doc.setFont("helvetica", "normal")
        doc.setFontSize(11)
        const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20)
        doc.text(splitAdvice, margin + 10, currentY + 20)
        currentY += 50

        autoTable(doc, {
            startY: currentY, margin: { left: margin, right: margin },
            head: [["#", "Question", "Score", "Feedback"]],
            body: questionWiseScore.map((q, i) => [`${i + 1}`, q.question, `${q.score}/10`, q.feedback]),
            styles: { fontSize: 9, cellPadding: 5, valign: "top" },
            headStyles: { fillColor: [99, 102, 241], textColor: 255, halign: "center" },
            columnStyles: {
                0: { cellWidth: 10, halign: "center" },
                1: { cellWidth: 55 },
                2: { cellWidth: 20, halign: "center" },
                3: { cellWidth: "auto" },
            },
            alternateRowStyles: { fillColor: [249, 250, 251] },
        })

        doc.save("AI_Interview_Report.pdf")
    }

    const cardStyle = {
        background: 'linear-gradient(145deg, rgba(12,12,28,0.98) 0%, rgba(16,16,36,0.97) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }

    return (
        <div className='min-h-screen px-4 sm:px-6 lg:px-10 py-8'
            style={{ background: 'linear-gradient(135deg, #05050f 0%, #0a0a1a 50%, #080818 100%)' }}>

            {/* Ambient orbs */}
            <div className='fixed top-1/4 left-1/6 w-80 h-80 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className='fixed bottom-1/4 right-1/6 w-64 h-64 rounded-full pointer-events-none'
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            {/* Header */}
            <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                <div className='flex items-start gap-4 flex-wrap'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/history")}
                        className='mt-1 p-3 rounded-full transition-all'
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
                    >
                        <FaArrowLeft />
                    </motion.button>
                    <div>
                        <h1 className='text-3xl font-bold' style={{ color: '#fff', letterSpacing: '-0.5px' }}>
                            Interview Analytics
                        </h1>
                        <p className='mt-1' style={{ color: 'rgba(255,255,255,0.35)' }}>AI-powered performance insights</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={downloadPDF}
                    className='flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white text-nowrap'
                    style={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                    }}
                >
                    <FaDownload size={14} />
                    Download PDF
                </motion.button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

                {/* LEFT column */}
                <div className='space-y-5'>
                    {/* Score card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className='p-7 text-center relative overflow-hidden'
                        style={cardStyle}
                    >
                        {/* Top glow line */}
                        <div style={{
                            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                            background: `linear-gradient(90deg, transparent, ${scoreColor}80, transparent)`,
                        }} />
                        <h3 className='text-sm font-medium mb-6' style={{ color: 'rgba(255,255,255,0.4)' }}>
                            Overall Performance
                        </h3>
                        <div className='relative w-28 h-28 mx-auto'>
                            <CircularProgressbar
                                value={percentage}
                                text={`${finalScore}/10`}
                                styles={buildStyles({
                                    textSize: '18px',
                                    pathColor: scoreColor,
                                    textColor: '#fff',
                                    trailColor: 'rgba(255,255,255,0.08)',
                                })}
                            />
                        </div>
                        <p className='text-xs mt-3' style={{ color: 'rgba(255,255,255,0.3)' }}>Out of 10</p>
                        <div className='mt-4 p-3 rounded-xl' style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
                            <p className='font-semibold text-sm' style={{ color: '#fff' }}>{performanceText}</p>
                            <p className='text-xs mt-1' style={{ color: 'rgba(255,255,255,0.4)' }}>{shortTagline}</p>
                        </div>
                    </motion.div>

                    {/* Skills card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className='p-6 relative overflow-hidden'
                        style={cardStyle}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)',
                        }} />
                        <h3 className='text-base font-semibold mb-6' style={{ color: '#fff' }}>Skill Evaluation</h3>
                        <div className='space-y-5'>
                            {skills.map((s, i) => (
                                <div key={i}>
                                    <div className='flex justify-between mb-2'>
                                        <span className='text-sm' style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</span>
                                        <span className='text-sm font-bold' style={{ color: '#818cf8' }}>{s.value}</span>
                                    </div>
                                    <div className='rounded-full overflow-hidden' style={{ background: 'rgba(255,255,255,0.07)', height: '8px' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${s.value * 10}%` }}
                                            transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                                            className='h-full rounded-full'
                                            style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT column */}
                <div className='lg:col-span-2 space-y-5'>
                    {/* Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className='p-6 relative overflow-hidden'
                        style={cardStyle}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)',
                        }} />
                        <h3 className='text-base font-semibold mb-6' style={{ color: '#fff' }}>Performance Trend</h3>
                        <div className='h-64 sm:h-72'>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={questionScoreData}>
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 10]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="score"
                                        stroke="#6366f1" strokeWidth={3}
                                        fill="url(#scoreGradient)"
                                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
                                        activeDot={{ r: 7, fill: '#a5b4fc' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Question breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className='p-6 relative overflow-hidden'
                        style={cardStyle}
                    >
                        <div style={{
                            position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), transparent)',
                        }} />
                        <h3 className='text-base font-semibold mb-6' style={{ color: '#fff' }}>Question Breakdown</h3>
                        <div className='space-y-4'>
                            {questionWiseScore.map((q, i) => {
                                const qScore = q.score ?? 0
                                const qColor = qScore >= 8 ? '#10b981' : qScore >= 5 ? '#f59e0b' : '#ef4444'
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06 }}
                                        className='p-5 rounded-2xl transition-all'
                                        style={{
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(99,102,241,0.15)',
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'
                                            e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.08)'
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3'>
                                            <div>
                                                <p className='text-xs mb-1' style={{ color: 'rgba(255,255,255,0.3)' }}>Question {i + 1}</p>
                                                <p className='font-semibold text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.85)' }}>
                                                    {q.question || "Question not available"}
                                                </p>
                                            </div>
                                            <span className='px-3 py-1 rounded-full text-xs font-bold w-fit'
                                                style={{
                                                    background: `${qColor}18`,
                                                    color: qColor,
                                                    border: `1px solid ${qColor}40`,
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                {qScore}/10
                                            </span>
                                        </div>
                                        <div className='p-4 rounded-xl'
                                            style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)' }}>
                                            <p className='text-xs font-semibold mb-1' style={{ color: '#818cf8' }}>AI Feedback</p>
                                            <p className='text-sm leading-relaxed' style={{ color: 'rgba(255,255,255,0.6)' }}>
                                                {q.feedback && q.feedback.trim() !== ""
                                                    ? q.feedback
                                                    : "No feedback available for this question."}
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Step3Report
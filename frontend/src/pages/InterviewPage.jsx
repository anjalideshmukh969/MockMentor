import React, { useState } from 'react'
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3Report from '../components/Step3Report';
import { motion, AnimatePresence } from "motion/react";

const STEP_LABELS = ['Setup', 'Interview', 'Report']

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#04080f',
      fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed', top: '-20%', left: '-15%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-20%', right: '-15%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.14) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.14) 1px,transparent 1px)`,
        backgroundSize: '80px 80px', opacity: 0.1
      }} />

      {/* Step indicator */}
      {step < 3 && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', justifyContent: 'center',
            paddingTop: 28, paddingBottom: 8, gap: 8
          }}
        >
          {STEP_LABELS.map((label, i) => {
            const idx = i + 1
            const active = idx === step
            const done = idx < step
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '6px 14px', borderRadius: 100,
                  background: active
                    ? 'linear-gradient(135deg,rgba(16,185,129,0.18),rgba(5,150,105,0.12))'
                    : done
                      ? 'rgba(16,185,129,0.08)'
                      : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(16,185,129,0.35)' : done ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.07)'}`,
                  transition: 'all 0.3s ease'
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: active ? 'linear-gradient(135deg,#10b981,#059669)' : done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                    color: active ? '#fff' : done ? '#10b981' : 'rgba(255,255,255,0.3)'
                  }}>
                    {done ? '✓' : idx}
                  </span>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: active ? '#10b981' : done ? 'rgba(16,185,129,0.7)' : 'rgba(255,255,255,0.3)'
                  }}>{label}</span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div style={{
                    width: 24, height: 1,
                    background: done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.07)'
                  }} />
                )}
              </div>
            )
          })}
        </motion.div>
      )}

      {/* Page content — all logic unchanged */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <Step1 onStart={(data) => { setInterviewData(data); setStep(2) }} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <Step2
                interviewData={interviewData}
                onFinish={(report) => { setInterviewData(report); setStep(2) }}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
            >
              <Step3Report report={interviewData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default InterviewPage
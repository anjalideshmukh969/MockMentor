import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';
import { motion } from "motion/react";
import { BsRobot } from 'react-icons/bs';

function InterviewReport() {
  const { id } = useParams()
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(ServerUrl + "/api/interview/report/" + id, { withCredentials: true })
        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReport()
  }, [])

  if (!report) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#04080f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 24,
        fontFamily: "'DM Sans','Segoe UI',system-ui,sans-serif"
      }}>
        {/* Ambient */}
        <div style={{
          position: 'fixed', top: '-20%', left: '-15%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: 56, height: 56,
            border: '2px solid rgba(16,185,129,0.15)',
            borderTop: '2px solid #10b981',
            borderRadius: '50%'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginBottom: 8
          }}>
            <BsRobot size={16} color="#10b981" />
            <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600, letterSpacing: 1 }}>
              LOADING REPORT
            </span>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>
            Fetching your interview analysis...
          </p>
        </motion.div>

        {/* Animated dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}
            />
          ))}
        </div>
      </div>
    )
  }

  return <Step3Report report={report} />
}

export default InterviewReport
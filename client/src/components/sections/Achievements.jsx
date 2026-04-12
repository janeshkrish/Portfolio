import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import API from '../../api/client'

const achievements = [
  {
    id: 1,
    title: 'PyExpo Hackathon Winner',
    detail: '1st place in PyExpo. Built an AI-powered solution within 24 hours. Competed with 200+ participants.',
    emoji: '🏆',
    color: '#FFE500',
    year: '2024',
  },
  {
    id: 2,
    title: 'Science Expo Winner',
    detail: 'Won college-level Science Expo with an innovative tech project demonstrating real-world application.',
    emoji: '🔬',
    color: '#FF3CAC',
    year: '2024',
  },
  {
    id: 3,
    title: 'SIH Selected 2024',
    detail: 'Selected for Smart India Hackathon 2024 at the college level. Proposed an AI-driven government solution.',
    emoji: '🇮🇳',
    color: '#2D6CDF',
    year: '2024',
  },
  {
    id: 4,
    title: 'SIH Selected 2025',
    detail: 'Again selected for Smart India Hackathon 2025. Two consecutive years of selection.',
    emoji: '🚀',
    color: '#00F5FF',
    year: '2025',
  },
]

const defaultColors = ['#FFE500', '#FF3CAC', '#2D6CDF', '#00F5FF']

export default function Achievements() {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    API.get('/achievements').then(r => setAchievements(r.data.data)).catch(()=>{})
  }, [])

  return (
    <section id="achievements" style={{ background: '#F5F5F0', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Achievements
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {achievements.map((a, i) => (
            <motion.div
              key={a._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ rotate: i % 2 === 0 ? -2 : 2, y: -8 }}
              style={{
                background: defaultColors[i % defaultColors.length],
                border: '3px solid #0D0D0D',
                boxShadow: '8px 8px 0 #0D0D0D',
                padding: 32,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Year stamp */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  background: '#0D0D0D',
                  color: defaultColors[i % defaultColors.length],
                  padding: '3px 10px',
                }}
              >
                {a.date}
              </div>

              {/* Emoji icon */}
              <div style={{ fontSize: '3.5rem', marginBottom: 16, lineHeight: 1 }}>{a.icon}</div>

              <h3
                style={{
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: '#0D0D0D',
                  marginBottom: 12,
                  lineHeight: 1.3,
                }}
              >
                {a.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#0D0D0D', lineHeight: 1.7, opacity: 0.85 }}>
                {a.description}
              </p>

              {/* Decorative corner */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: -20,
                  width: 80,
                  height: 80,
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '50%',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

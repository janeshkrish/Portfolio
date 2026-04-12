import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiCode } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import API from '../../api/client'

const marqueeItems = [
  '🚀 Full Stack Dev', '⚡ MERN Stack', '🎯 DSA', '☁️ Cloud Basics',
  '🐳 Docker', '🔥 Open Source', '🏆 Hackathon Winner', '💡 Problem Solver',
  '🚀 Full Stack Dev', '⚡ MERN Stack', '🎯 DSA', '☁️ Cloud Basics',
  '🐳 Docker', '🔥 Open Source', '🏆 Hackathon Winner', '💡 Problem Solver',
]

const socials = [
  { icon: <FiGithub size={22} />, href: 'https://github.com/janeshkrish', label: 'GitHub', color: '#0D0D0D' },
  { icon: <FiLinkedin size={22} />, href: 'https://www.linkedin.com/in/janesh-krishna-r-725aa0295/', label: 'LinkedIn', color: '#2D6CDF' },
  { icon: <SiLeetcode size={22} />, href: 'https://leetcode.com/u/janeshkrishna/', label: 'LeetCode', color: '#FF3CAC' },
  { icon: <FiMail size={22} />, href: 'mailto:janeshkrishna12@gmail.com', label: 'Email', color: '#FFE500' },
]

export default function Hero() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    API.get('/profile').then(r => setProfile(r.data.data)).catch(() => {})
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: '#0D0D0D',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,229,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,229,0,0.07) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '120px 24px 60px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
          {/* Tag pill */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#FFE500',
                border: '3px solid #FFE500',
                padding: '6px 16px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0D0D0D',
                boxShadow: '4px 4px 0 rgba(255,229,0,0.3)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D0D0D' }} />
              Available for Opportunities
            </span>
          </motion.div>

          {/* Name + Role */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3rem, 10vw, 7rem)',
                lineHeight: 0.95,
                color: '#F5F5F0',
                letterSpacing: '-3px',
                marginBottom: 16,
              }}
            >
              JANESH
              <br />
              <span
                style={{
                  color: '#0D0D0D',
                  WebkitTextStroke: '3px #FFE500',
                  display: 'block',
                }}
              >
                KRISHNA R
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}
            >
              <div
                style={{
                  background: '#FF3CAC',
                  border: '3px solid #FF3CAC',
                  padding: '10px 24px',
                  boxShadow: '5px 5px 0 rgba(255,60,172,0.4)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                    color: '#F5F5F0',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                  }}
                >
                  {'<'} Aspiring SDE {'>'}
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{
                color: '#A0A0A0',
                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                maxWidth: 560,
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              {profile?.bio || 'Full-stack developer with strong proficiency in RESTful APIs, scalable application design, and DSA. Building the web, one brutal block at a time.'}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}
            >
              <a
                href="#projects"
                className="brutal-btn"
                style={{
                  background: '#FFE500',
                  color: '#0D0D0D',
                  padding: '14px 32px',
                  fontSize: '1rem',
                  border: '3px solid #FFE500',
                  boxShadow: '6px 6px 0 rgba(255,229,0,0.4)',
                }}
              >
                View Projects ↓
              </a>
              <a
                href="#contact"
                className="brutal-btn"
                style={{
                  background: 'transparent',
                  color: '#F5F5F0',
                  padding: '14px 32px',
                  fontSize: '1rem',
                  border: '3px solid #F5F5F0',
                  boxShadow: '6px 6px 0 rgba(245,245,240,0.2)',
                }}
              >
                Hire Me ✉
              </a>
              <a
                href="https://certifcate-management.vercel.app/profile"
                target="_blank"
                rel="noreferrer"
                className="brutal-btn"
                style={{
                  background: '#FF3CAC',
                  color: '#F5F5F0',
                  padding: '14px 32px',
                  fontSize: '1rem',
                  border: '3px solid #FF3CAC',
                  boxShadow: '6px 6px 0 rgba(255,60,172,0.4)',
                }}
              >
                Portfolio ↗
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              style={{ display: 'flex', gap: 12 }}
            >
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  whileTap={{ scale: 0.92 }}
                  title={s.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    background: s.color,
                    border: '3px solid #F5F5F0',
                    boxShadow: '4px 4px 0 rgba(245,245,240,0.3)',
                    color: s.color === '#FFE500' ? '#0D0D0D' : '#F5F5F0',
                    textDecoration: 'none',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
            marginTop: 60,
          }}
        >
          {[
            { label: 'CGPA', value: profile?.cgpa || '8.24', color: '#FFE500' },
            { label: 'Internships', value: profile?.internships || '2+', color: '#FF3CAC' },
            { label: 'Projects', value: profile?.projectsCount || '10+', color: '#2D6CDF' },
            { label: 'Hackathons', value: profile?.hackathons || '3W', color: '#00F5FF' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: stat.color,
                border: '3px solid #F5F5F0',
                padding: '20px 24px',
                boxShadow: '5px 5px 0 rgba(245,245,240,0.2)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '2.5rem',
                  color: '#0D0D0D',
                  letterSpacing: '2px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#0D0D0D',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee Banner */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: '3px solid #FFE500',
          borderBottom: '3px solid #FFE500',
          background: '#FFE500',
          padding: '14px 0',
        }}
      >
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              style={{
                padding: '0 32px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#0D0D0D',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

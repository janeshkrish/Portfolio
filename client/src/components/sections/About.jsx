import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiBookOpen, FiMapPin, FiMail, FiCalendar } from 'react-icons/fi'
import API from '../../api/client'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function About() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    API.get('/profile').then((r) => setProfile(r.data.data)).catch(() => {})
  }, [])

  return (
    <section id="about" style={{ background: '#F5F5F0', padding: '100px 0' }}>
      <div className="section-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp} className="section-title">
            About Me
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 32,
              alignItems: 'start',
            }}
          >
            {/* Bio Card */}
            <motion.div
              variants={fadeUp}
              className="brutal-card"
              style={{
                background: '#0D0D0D',
                color: '#F5F5F0',
                padding: 32,
                gridColumn: 'span 1',
              }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '1.4rem',
                  color: '#FFE500',
                  letterSpacing: '3px',
                  marginBottom: 16,
                }}
              >
                {'// Bio'}
              </div>
              <p style={{ lineHeight: 1.8, fontSize: '1rem', color: '#D0D0D0', whiteSpace: 'pre-wrap' }}>
                {profile?.aboutText || "Aspiring Software Development Engineer with strong proficiency in full-stack development, RESTful APIs, scalable application design, and Data Structures & Algorithms.\n\nI love building things that actually work — from hackathon prototypes to production HRMS systems. When I'm not coding, I'm probably solving LeetCode."}
              </p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={fadeUp}
              className="brutal-card"
              style={{ background: '#FFE500', padding: 32 }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '1.4rem',
                  color: '#0D0D0D',
                  letterSpacing: '3px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <FiBookOpen size={22} /> Education
              </div>

              <div
                style={{
                  border: '3px solid #0D0D0D',
                  background: '#F5F5F0',
                  padding: '20px 24px',
                  boxShadow: '5px 5px 0 #0D0D0D',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>
                  {profile?.degreeTitle || 'B.Tech — Information Technology'}
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', marginBottom: 12 }}>
                  {profile?.university || 'KGiSL Institute of Technology'}
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: '#0D0D0D',
                      color: '#FFE500',
                      padding: '4px 12px',
                    }}
                  >
                    <FiCalendar size={14} /> {profile?.educationYears || '2023 – 2027'}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      background: '#FF3CAC',
                      color: '#F5F5F0',
                      padding: '4px 12px',
                    }}
                  >
                    CGPA: {profile?.cgpa || '8.24'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              variants={fadeUp}
              className="brutal-card"
              style={{ background: '#FF3CAC', color: '#F5F5F0', padding: 32 }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '1.4rem',
                  letterSpacing: '3px',
                  marginBottom: 20,
                }}
              >
                Quick Info
              </div>
              {[
                { icon: <FiMapPin />, label: 'Location', value: profile?.location || 'Coimbatore, TN' },
                { icon: <FiMail />, label: 'Email', value: profile?.email || 'janeshkrishna12@gmail.com' },
                { icon: <FiCalendar />, label: 'Status', value: profile?.status || 'Open to Internships/SDE roles' },
                { icon: <FiBookOpen />, label: 'Degree', value: profile?.degree || 'B.Tech IT (3rd Year)' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 0',
                    borderBottom: '2px solid rgba(245,245,240,0.4)',
                  }}
                >
                  <span style={{ marginTop: 3, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

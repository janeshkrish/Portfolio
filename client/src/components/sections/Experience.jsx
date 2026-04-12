import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import API from '../../api/client'

const FALLBACK_EXPERIENCES = [
  {
    id: 1,
    role: 'Software Developer Intern',
    company: 'Nubiznez Pvt Ltd',
    period: '2025',
    color: '#FFE500',
    side: 'left',
    points: [
      'Built HRMS & eCampus modules using the MERN stack (MongoDB, Express, React, Node.js)',
      'Developed RESTful APIs for employee management, leave tracking, and report generation',
      'Designed responsive UI components and integrated JWT-based authentication',
      'Collaborated with a 5-person team using Git workflow (feature branches, PRs)',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express', 'JWT'],
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Silent Feedback System',
    period: '2026',
    color: '#FF3CAC',
    side: 'right',
    points: [
      'Developed an anonymous HR feedback platform using PHP and MySQL',
      'Implemented role-based access control for HR managers and employees',
      'Built secure anonymous feedback submission with no IP tracking',
      'Created admin analytics dashboard with real-time feedback metrics',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'AJAX'],
  },
]

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/experience')
      .then((r) => setExperiences(r.data.data?.length ? r.data.data : FALLBACK_EXPERIENCES))
      .catch(() => setExperiences(FALLBACK_EXPERIENCES))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="experience" style={{ background: '#0D0D0D', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ color: '#F5F5F0' }}
        >
          <span style={{ background: '#FFE500' }} /> Experience
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 4,
              background: '#F5F5F0',
              top: 0,
              bottom: 0,
            }}
            className="hidden md:block"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {loading ? <div className="skeleton" style={{ height: 200, width: '100%', maxWidth: 600, margin: '0 auto' }} /> : experiences.map((exp, i) => (
              <div key={exp._id || exp.id} className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0, x: exp.side === 'left' ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: 32,
                    alignItems: 'center',
                  }}
                >
                {/* Left content */}
                {exp.side === 'left' ? (
                  <div
                    style={{
                      background: exp.color,
                      border: '3px solid #F5F5F0',
                      boxShadow: '6px 6px 0 rgba(245,245,240,0.2)',
                      padding: 28,
                    }}
                  >
                    <ExpContent exp={exp} />
                  </div>
                ) : (
                  <div />
                )}

                {/* Center dot */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: exp.color,
                    border: '4px solid #F5F5F0',
                    boxShadow: `0 0 0 4px ${exp.color}`,
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />

                {/* Right content */}
                {exp.side === 'right' ? (
                  <div
                    style={{
                      background: exp.color,
                      border: '3px solid #F5F5F0',
                      boxShadow: '6px 6px 0 rgba(245,245,240,0.2)',
                      padding: 28,
                    }}
                  >
                    <ExpContent exp={exp} />
                  </div>
                ) : (
                  <div />
                )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile: stack */}
          <div className="md:hidden">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {loading ? <div className="skeleton" style={{ height: 200 }} /> : experiences.map((exp, i) => (
              <motion.div
                key={exp._id || exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: exp.color,
                  border: '3px solid #F5F5F0',
                  boxShadow: '6px 6px 0 rgba(245,245,240,0.2)',
                  padding: 24,
                }}
              >
                <ExpContent exp={exp} />
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExpContent({ exp }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          color: '#0D0D0D',
          opacity: 0.6,
          marginBottom: 6,
        }}
      >
        {exp.period}
      </div>
      <h3
        style={{
          fontWeight: 800,
          fontSize: '1.15rem',
          color: '#0D0D0D',
          marginBottom: 4,
        }}
      >
        {exp.role}
      </h3>
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: '#0D0D0D',
          marginBottom: 16,
          opacity: 0.8,
        }}
      >
        @ {exp.company}
      </div>
      <ul style={{ paddingLeft: 16, marginBottom: 16 }}>
        {exp.points.map((pt, i) => (
          <li
            key={i}
            style={{ fontSize: '0.88rem', color: '#0D0D0D', marginBottom: 6, lineHeight: 1.6 }}
          >
            {pt}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {exp.tech.map((t) => (
          <span
            key={t}
            style={{
              background: '#0D0D0D',
              color: exp.color,
              border: '2px solid #0D0D0D',
              padding: '2px 10px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              fontWeight: 700,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

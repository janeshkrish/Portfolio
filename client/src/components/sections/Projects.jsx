import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import API from '../../api/client'

const FALLBACK_PROJECTS = [
  {
    _id: '1',
    title: 'Roadside Assistance App',
    description:
      'A MERN stack app connecting stranded drivers with nearby mechanics. Real-time location tracking, live chat, and OTP-based secure service booking.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'Maps API'],
    repoUrl: 'https://github.com/janeshkrish',
    liveUrl: '',
    imageUrl: '',
    featured: true,
  },
  {
    _id: '2',
    title: 'Silent Feedback System',
    description:
      'Anonymous HR feedback platform built with PHP & MySQL. Role-based access for HR and employees, secure anonymous submission, admin analytics dashboard.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    repoUrl: 'https://github.com/janeshkrish',
    liveUrl: '',
    imageUrl: '',
    featured: true,
  },
]

const TAG_COLORS = ['#FFE500', '#FF3CAC', '#2D6CDF', '#00F5FF', '#0D0D0D', '#F5F5F0']

function getTagColor(tag, i) {
  return TAG_COLORS[i % TAG_COLORS.length]
}

function SkeletonCard() {
  return (
    <div className="skeleton" style={{ height: 340, borderRadius: 0 }} />
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/projects')
      .then((r) => setProjects(r.data.data?.length ? r.data.data : FALLBACK_PROJECTS))
      .catch(() => setProjects(FALLBACK_PROJECTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="projects" style={{ background: '#F5F5F0', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Projects
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
          }}
        >
          {loading
            ? Array(2).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : projects.map((p, idx) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="brutal-card"
                  style={{
                    background: '#0D0D0D',
                    color: '#F5F5F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Image or color block */}
                  <div
                    style={{
                      height: 160,
                      background: p.imageUrl
                        ? `url(${p.imageUrl}) center/cover no-repeat`
                        : idx % 2 === 0
                        ? '#FFE500'
                        : '#FF3CAC',
                      borderBottom: '3px solid #F5F5F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {!p.imageUrl && (
                      <span
                        style={{
                          fontFamily: 'Bebas Neue, cursive',
                          fontSize: '4rem',
                          color: '#0D0D0D',
                          letterSpacing: '3px',
                          opacity: 0.3,
                        }}
                      >
                        {p.title.charAt(0)}
                      </span>
                    )}
                    {p.featured && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: '#FFE500',
                          border: '2px solid #0D0D0D',
                          padding: '2px 10px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          fontFamily: 'JetBrains Mono',
                        }}
                      >
                        ★ FEATURED
                      </div>
                    )}
                  </div>

                  <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 10 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: '#A0A0A0', fontSize: '0.9rem', lineHeight: 1.7, flex: 1, marginBottom: 16 }}>
                      {p.description}
                    </p>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                      {p.tags.map((tag, ti) => (
                        <span
                          key={tag}
                          style={{
                            background: getTagColor(tag, ti),
                            color: getTagColor(tag, ti) === '#F5F5F0' || getTagColor(tag, ti) === '#FFE500' || getTagColor(tag, ti) === '#00F5FF' ? '#0D0D0D' : '#F5F5F0',
                            border: '2px solid #F5F5F0',
                            padding: '3px 10px',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      {p.repoUrl && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="brutal-btn"
                          style={{
                            background: '#F5F5F0',
                            color: '#0D0D0D',
                            padding: '8px 16px',
                            fontSize: '0.8rem',
                            border: '2px solid #F5F5F0',
                            flex: 1,
                            justifyContent: 'center',
                          }}
                        >
                          <FiGithub /> Code
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="brutal-btn"
                          style={{
                            background: '#FFE500',
                            color: '#0D0D0D',
                            padding: '8px 16px',
                            fontSize: '0.8rem',
                            border: '2px solid #FFE500',
                            flex: 1,
                            justifyContent: 'center',
                          }}
                        >
                          <FiExternalLink /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  )
}

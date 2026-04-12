import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiExternalLink, FiAward } from 'react-icons/fi'
import API from '../../api/client'

function SkeletonCard() {
  return <div className="skeleton" style={{ height: 180, borderRadius: 0 }} />
}

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('cards') // 'cards' | 'iframe'

  useEffect(() => {
    API.get('/certificates')
      .then((r) => setCerts(r.data.data || []))
      .catch(() => setCerts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="certificates" style={{ background: '#0D0D0D', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ color: '#F5F5F0' }}
        >
          <span style={{ background: '#FFE500' }} /> Certificates
        </motion.div>

        {/* Tab Switch */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40, border: '3px solid #F5F5F0', width: 'fit-content' }}>
          {['cards', 'iframe'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '10px 28px',
                background: tab === t ? '#FFE500' : 'transparent',
                color: tab === t ? '#0D0D0D' : '#F5F5F0',
                border: 'none',
                borderRight: t === 'cards' ? '3px solid #F5F5F0' : 'none',
                fontWeight: 800,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.85rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.15s',
              }}
            >
              {t === 'cards' ? '🃏 Cards' : '🌐 Portfolio'}
            </button>
          ))}
        </div>

        {tab === 'iframe' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              border: '3px solid #F5F5F0',
              boxShadow: '8px 8px 0 #FFE500',
              overflow: 'hidden',
              height: 600,
            }}
          >
            <iframe
              src="https://certifcate-management.vercel.app/profile"
              title="Janesh Krishna Certificates"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
            {loading
              ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
              : certs.length === 0
              ? (
                <div
                  style={{
                    gridColumn: '1/-1',
                    textAlign: 'center',
                    color: '#A0A0A0',
                    padding: '60px 0',
                    border: '3px dashed #A0A0A0',
                  }}
                >
                  <FiAward size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>
                    Switch to Portfolio tab to see certificates, or ask admin to add some here.
                  </p>
                  <a
                    href="https://certifcate-management.vercel.app/profile"
                    target="_blank"
                    rel="noreferrer"
                    className="brutal-btn"
                    style={{
                      marginTop: 20,
                      display: 'inline-flex',
                      background: '#FFE500',
                      color: '#0D0D0D',
                      padding: '10px 24px',
                      border: '3px solid #FFE500',
                    }}
                  >
                    View Full Portfolio ↗
                  </a>
                </div>
              )
              : certs.map((cert, i) => (
                  <motion.div
                    key={cert._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -6 }}
                    style={{
                      background: i % 3 === 0 ? '#FFE500' : i % 3 === 1 ? '#FF3CAC' : '#2D6CDF',
                      border: '3px solid #F5F5F0',
                      boxShadow: '6px 6px 0 rgba(245,245,240,0.15)',
                      padding: 24,
                      color: '#0D0D0D',
                    }}
                  >
                    {cert.imageUrl && (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        style={{ width: '100%', height: 120, objectFit: 'cover', border: '2px solid #0D0D0D', marginBottom: 16 }}
                      />
                    )}
                    <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 6, color: i % 3 === 0 ? '#0D0D0D' : '#F5F5F0' }}>
                      {cert.title}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', marginBottom: 4, color: i % 3 === 0 ? '#0D0D0D' : 'rgba(245,245,240,0.8)' }}>
                      {cert.issuer}
                    </div>
                    {cert.date && (
                      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', opacity: 0.7, color: i % 3 === 0 ? '#0D0D0D' : '#F5F5F0' }}>
                        {cert.date}
                      </div>
                    )}
                    {cert.credentialLink && (
                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          marginTop: 12,
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          color: i % 3 === 0 ? '#0D0D0D' : '#F5F5F0',
                          textDecoration: 'underline',
                        }}
                      >
                        <FiExternalLink size={14} /> View Credential
                      </a>
                    )}
                  </motion.div>
                ))}
          </div>
        )}
      </div>
    </section>
  )
}

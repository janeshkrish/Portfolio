import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiStar, FiGitBranch, FiCode, FiUsers } from 'react-icons/fi'
import { SiLeetcode, SiCodechef } from 'react-icons/si'
import API from '../../api/client'

function StatBox({ label, value, color, mono }) {
  return (
    <div
      style={{
        background: color,
        border: '3px solid #0D0D0D',
        boxShadow: '4px 4px 0 #0D0D0D',
        padding: '16px 20px',
        minWidth: 100,
      }}
    >
      <div
        style={{
          fontFamily: mono ? 'JetBrains Mono, monospace' : 'Bebas Neue, cursive',
          fontSize: mono ? '1.4rem' : '2rem',
          fontWeight: 700,
          color: color === '#0D0D0D' ? '#F5F5F0' : '#0D0D0D',
        }}
      >
        {value ?? '—'}
      </div>
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: color === '#0D0D0D' ? '#F5F5F0' : '#0D0D0D',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          opacity: 0.7,
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Skeleton({ h = 200 }) {
  return <div className="skeleton" style={{ height: h }} />
}

export default function CodingProfiles() {
  const [leetcode, setLeetcode] = useState(null)
  const [github, setGithub] = useState(null)
  const [codechef, setCodechef] = useState(null)
  const [loading, setLoading] = useState({ lc: true, gh: true, cc: true })

  useEffect(() => {
    API.get('/coding/leetcode')
      .then((r) => setLeetcode(r.data.data))
      .catch(() => setLeetcode({ error: true }))
      .finally(() => setLoading((p) => ({ ...p, lc: false })))

    API.get('/coding/github')
      .then((r) => setGithub(r.data.data))
      .catch(() => setGithub({ error: true }))
      .finally(() => setLoading((p) => ({ ...p, gh: false })))

    API.get('/coding/codechef')
      .then((r) => setCodechef(r.data.data))
      .catch(() => setCodechef({ error: true }))
      .finally(() => setLoading((p) => ({ ...p, cc: false })))
  }, [])

  return (
    <section id="coding" style={{ background: '#F5F5F0', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Coding Profiles
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 28,
          }}
        >
          {/* ── LeetCode ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            style={{ border: '3px solid #0D0D0D', boxShadow: '8px 8px 0 #0D0D0D' }}
          >
            <div
              style={{
                background: '#FFE500',
                borderBottom: '3px solid #0D0D0D',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <SiLeetcode size={28} color="#0D0D0D" />
              <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.4rem', letterSpacing: '2px' }}>
                LeetCode
              </span>
              <a
                href="https://leetcode.com/u/janeshkrishna/"
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 700, color: '#0D0D0D', textDecoration: 'underline' }}
              >
                @janeshkrishna ↗
              </a>
            </div>
            <div style={{ background: '#F5F5F0', padding: 24 }}>
              {loading.lc ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton h={60} /><Skeleton h={60} /><Skeleton h={60} />
                </div>
              ) : leetcode?.error ? (
                <p style={{ fontFamily: 'JetBrains Mono', color: '#FF0000', fontSize: '0.85rem' }}>
                  Could not load LeetCode stats (API limit).
                </p>
              ) : (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                    <StatBox label="Total Solved" value={leetcode.totalSolved} color="#FFE500" />
                    <StatBox label="Easy" value={leetcode.easySolved} color="#00F5FF" />
                    <StatBox label="Medium" value={leetcode.mediumSolved} color="#FF3CAC" />
                    <StatBox label="Hard" value={leetcode.hardSolved} color="#0D0D0D" />
                  </div>
                  {leetcode.contestRating && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                      <StatBox label="Contest Rating" value={leetcode.contestRating} color="#2D6CDF" />
                      <StatBox label="Contests" value={leetcode.contestAttended} color="#F5F5F0" />
                      <StatBox label="Badges" value={leetcode.badges} color="#FF3CAC" />
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* ── GitHub ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            style={{ border: '3px solid #0D0D0D', boxShadow: '8px 8px 0 #FF3CAC' }}
          >
            <div
              style={{
                background: '#0D0D0D',
                borderBottom: '3px solid #0D0D0D',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <FiGithub size={28} color="#FFE500" />
              <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.4rem', letterSpacing: '2px', color: '#F5F5F0' }}>
                GitHub
              </span>
              <a
                href="https://github.com/janeshkrish"
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 700, color: '#FFE500', textDecoration: 'underline' }}
              >
                @janeshkrish ↗
              </a>
            </div>
            <div style={{ background: '#F5F5F0', padding: 24 }}>
              {loading.gh ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton h={60} /><Skeleton h={60} /><Skeleton h={60} />
                </div>
              ) : github?.error ? (
                <p style={{ fontFamily: 'JetBrains Mono', color: '#FF0000', fontSize: '0.85rem' }}>
                  Could not load GitHub stats.
                </p>
              ) : (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
                    <StatBox label="Repos" value={github.publicRepos} color="#FFE500" />
                    <StatBox label="Followers" value={github.followers} color="#FF3CAC" />
                    <StatBox label="Stars" value={github.totalStars} color="#00F5FF" />
                    <StatBox label="30d Pushes" value={github.recentPushes} color="#2D6CDF" />
                  </div>
                  {/* Top repos */}
                  <div style={{ borderTop: '3px solid #0D0D0D', paddingTop: 16 }}>
                    <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: '0.75rem', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Top Repositories
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {github.topRepos?.slice(0, 4).map((r) => (
                        <a
                          key={r.name}
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: '#0D0D0D',
                            color: '#F5F5F0',
                            padding: '8px 14px',
                            border: '2px solid #0D0D0D',
                            textDecoration: 'none',
                            transition: 'all 0.15s',
                          }}
                        >
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{r.name}</span>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                            {r.language && (
                              <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#FFE500' }}>{r.language}</span>
                            )}
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
                              <FiStar size={12} /> {r.stars}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* ── CodeChef ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            style={{ border: '3px solid #0D0D0D', boxShadow: '8px 8px 0 #2D6CDF' }}
          >
            <div
              style={{
                background: '#FF3CAC',
                borderBottom: '3px solid #0D0D0D',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <SiCodechef size={28} color="#F5F5F0" />
              <span style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.4rem', letterSpacing: '2px', color: '#F5F5F0' }}>
                CodeChef
              </span>
              <a
                href="https://www.codechef.com/users/kgisl_23it17"
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 700, color: '#FFE500', textDecoration: 'underline' }}
              >
                @kgisl_23it17 ↗
              </a>
            </div>
            <div style={{ background: '#F5F5F0', padding: 24 }}>
              {loading.cc ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Skeleton h={60} /><Skeleton h={60} />
                </div>
              ) : codechef?.error ? (
                <div>
                  <p style={{ fontFamily: 'JetBrains Mono', color: '#555', fontSize: '0.85rem', marginBottom: 12 }}>
                    Live scraping unavailable — CodeChef blocks bots. Visit profile directly.
                  </p>
                  <a
                    href="https://www.codechef.com/users/kgisl_23it17"
                    target="_blank"
                    rel="noreferrer"
                    className="brutal-btn"
                    style={{ background: '#FF3CAC', color: '#F5F5F0', padding: '10px 20px', border: '3px solid #0D0D0D', fontSize: '0.85rem' }}
                  >
                    <SiCodechef /> View Profile
                  </a>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <StatBox label="Rating" value={codechef.rating} color="#FF3CAC" />
                  <StatBox label="Stars" value={codechef.stars} color="#FFE500" mono />
                  <StatBox label="Global Rank" value={codechef.globalRank} color="#2D6CDF" />
                  <StatBox label="Country Rank" value={codechef.countryRank} color="#00F5FF" />
                  <StatBox label="Solved" value={codechef.problemsSolved} color="#0D0D0D" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

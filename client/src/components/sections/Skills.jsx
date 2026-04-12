import { motion } from 'framer-motion'

const skillGroups = [
  {
    category: 'Languages',
    color: '#FFE500',
    textColor: '#0D0D0D',
    skills: [
      { name: 'Java', level: 85, icon: '☕' },
      { name: 'Python', level: 80, icon: '🐍' },
      { name: 'JavaScript', level: 90, icon: '⚡' },
      { name: 'PHP', level: 70, icon: '🐘' },
    ],
  },
  {
    category: 'Frontend',
    color: '#FF3CAC',
    textColor: '#F5F5F0',
    skills: [
      { name: 'React.js', level: 88, icon: '⚛' },
      { name: 'HTML/CSS', level: 92, icon: '🎨' },
      { name: 'Tailwind', level: 85, icon: '💨' },
    ],
  },
  {
    category: 'Backend',
    color: '#2D6CDF',
    textColor: '#F5F5F0',
    skills: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Express', level: 82, icon: '🚂' },
      { name: 'REST APIs', level: 88, icon: '🔗' },
    ],
  },
  {
    category: 'Database',
    color: '#00F5FF',
    textColor: '#0D0D0D',
    skills: [
      { name: 'MongoDB', level: 82, icon: '🍃' },
      { name: 'MySQL', level: 80, icon: '🗄' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: '#0D0D0D',
    textColor: '#FFE500',
    skills: [
      { name: 'Docker', level: 65, icon: '🐳' },
      { name: 'AWS Basics', level: 60, icon: '☁' },
      { name: 'GCP Basics', level: 55, icon: '🌐' },
      { name: 'Git/GitHub', level: 90, icon: '🔀' },
    ],
  },
  {
    category: 'CS Concepts',
    color: '#F5F5F0',
    textColor: '#0D0D0D',
    skills: [
      { name: 'DSA', level: 80, icon: '🌲' },
      { name: 'OOP', level: 88, icon: '📦' },
      { name: 'System Design', level: 65, icon: '🏗' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" style={{ background: '#0D0D0D', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title"
          style={{ color: '#F5F5F0' }}
        >
          <span style={{ background: '#FFE500' }} /> Skills
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: group.color,
                border: '3px solid #F5F5F0',
                boxShadow: '6px 6px 0 rgba(245,245,240,0.15)',
                padding: 28,
              }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: '1.2rem',
                  color: group.textColor,
                  letterSpacing: '3px',
                  marginBottom: 20,
                  borderBottom: `3px solid ${group.textColor === '#0D0D0D' ? '#0D0D0D' : 'rgba(245,245,240,0.4)'}`,
                  paddingBottom: 12,
                }}
              >
                {group.category}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                        color: group.textColor,
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        {skill.icon} {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: 'rgba(0,0,0,0.15)',
                        border: `2px solid ${group.textColor === '#F5F5F0' ? 'rgba(245,245,240,0.4)' : '#0D0D0D'}`,
                        overflow: 'hidden',
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: gi * 0.1 + 0.3, ease: 'easeOut' }}
                        style={{
                          height: '100%',
                          background: group.textColor === '#F5F5F0' ? 'rgba(245,245,240,0.9)' : '#0D0D0D',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

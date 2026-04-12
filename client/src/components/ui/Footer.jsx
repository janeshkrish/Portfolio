import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { SiLeetcode, SiCodechef } from 'react-icons/si'

const links = [
  { icon: <FiGithub size={18} />, href: 'https://github.com/janeshkrish', label: 'GitHub' },
  { icon: <FiLinkedin size={18} />, href: 'https://www.linkedin.com/in/janesh-krishna-r-725aa0295/', label: 'LinkedIn' },
  { icon: <SiLeetcode size={18} />, href: 'https://leetcode.com/u/janeshkrishna/', label: 'LeetCode' },
  { icon: <SiCodechef size={18} />, href: 'https://www.codechef.com/users/kgisl_23it17', label: 'CodeChef' },
  { icon: <FiMail size={18} />, href: 'mailto:janeshkrishna12@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0D0D0D',
        borderTop: '4px solid #FFE500',
        padding: '48px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '3rem',
            color: '#FFE500',
            letterSpacing: '4px',
          }}
        >
          JANESH<span style={{ color: '#FF3CAC' }}>.</span>
        </div>

        {/* Links row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              title={l.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: '#A0A0A0',
                textDecoration: 'none',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '2px solid #333',
                padding: '6px 14px',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#FFE500'; e.currentTarget.style.borderColor = '#FFE500' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#A0A0A0'; e.currentTarget.style.borderColor = '#333' }}
            >
              {l.icon} {l.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 3, background: '#1A1A1A' }} />

        {/* Credit */}
        <p
          style={{
            color: '#555',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} Janesh Krishna R
        </p>
      </div>
    </footer>
  )
}

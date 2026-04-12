import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs', href: '#certificates' },
  { label: 'Code', href: '#coding' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: scrolled ? '3px solid #0D0D0D' : '3px solid transparent',
          backgroundColor: scrolled ? '#FFE500' : 'transparent',
          transition: 'all 0.3s',
          boxShadow: scrolled ? '0 4px 0 #0D0D0D' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '1.8rem',
              letterSpacing: '2px',
              color: '#0D0D0D',
              textDecoration: 'none',
            }}
          >
            JK<span style={{ color: '#FF3CAC' }}>.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`nav-link ${active === l.href ? 'active' : ''}`}
                onClick={() => setActive(l.href)}
              >
                {l.label}
              </a>
            ))}
            <a
              href="https://github.com/janeshkrish"
              target="_blank"
              rel="noreferrer"
              className="brutal-btn"
              style={{
                background: '#0D0D0D',
                color: '#FFE500',
                padding: '8px 20px',
                fontSize: '0.8rem',
              }}
            >
              GitHub ↗
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden brutal-btn"
            onClick={() => setOpen(!open)}
            style={{ background: '#0D0D0D', color: '#FFE500', padding: '6px 10px' }}
            aria-label="Toggle menu"
          >
            {open ? <RiCloseLine size={22} /> : <RiMenu4Line size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '80%',
              maxWidth: 320,
              background: '#FFE500',
              border: '3px solid #0D0D0D',
              borderRight: 'none',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 32px 32px',
              gap: 24,
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20 }}
            >
              <RiCloseLine size={28} />
            </button>
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  textDecoration: 'none',
                  color: '#0D0D0D',
                  borderBottom: '3px solid #0D0D0D',
                  paddingBottom: 12,
                  textTransform: 'uppercase',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

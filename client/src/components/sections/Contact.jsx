import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import toast from 'react-hot-toast'
import API from '../../api/client'

const ADMIN_EMAIL_TRIGGER = import.meta.env.VITE_ADMIN_EMAIL || 'admin@gmail.com'
const ADMIN_PASS_TRIGGER = import.meta.env.VITE_ADMIN_PASS || '-pass'

export default function Contact() {
  const navigate = useNavigate()
  const { login } = useAdmin()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔐 Hidden admin trigger check
    if (
      form.email.trim().toLowerCase() === ADMIN_EMAIL_TRIGGER.toLowerCase() &&
      form.message.trim() === ADMIN_PASS_TRIGGER
    ) {
      try {
        const res = await API.post('/admin/login', {
          email: ADMIN_EMAIL_TRIGGER, // Send the exact config email
          password: ADMIN_PASS_TRIGGER,
        })
        if (res.data.success) {
          login(res.data.token)
          toast.success('Welcome back, Admin 👋')
          navigate('/admin')
        }
      } catch {
        toast.error('Admin login failed.')
      }
      return
    }

    // Normal form submission — show success (no real email API configured here)
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    toast.success('Message sent! I\'ll get back to you soon 🚀')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" style={{ background: '#0D0D0D', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title"
          style={{ color: '#F5F5F0' }}
        >
          <span style={{ background: '#FFE500' }} /> Contact
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
          }}
        >
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3
              style={{
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '2.5rem',
                color: '#FFE500',
                letterSpacing: '2px',
                marginBottom: 16,
                lineHeight: 1.1,
              }}
            >
              Let's Build<br />Something<br />Together
            </h3>
            <p style={{ color: '#A0A0A0', lineHeight: 1.8, marginBottom: 32, fontSize: '0.95rem' }}>
              Whether it's a freelance project, internship opportunity, or just saying hi — I'm always
              open to interesting conversations.
            </p>

            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
              <a
                href="mailto:janeshkrishna12@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#F5F5F0',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    background: '#FFE500',
                    color: '#0D0D0D',
                    border: '3px solid #F5F5F0',
                    width: 42,
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiMail />
                </span>
                janeshkrishna12@gmail.com
              </a>
              <a
                href="https://github.com/janeshkrish"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#F5F5F0',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    background: '#0D0D0D',
                    color: '#FFE500',
                    border: '3px solid #F5F5F0',
                    width: 42,
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiGithub />
                </span>
                github.com/janeshkrish
              </a>
              <a
                href="https://www.linkedin.com/in/janesh-krishna-r-725aa0295/"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  color: '#F5F5F0',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    background: '#2D6CDF',
                    color: '#F5F5F0',
                    border: '3px solid #F5F5F0',
                    width: 42,
                    height: 42,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <FiLinkedin />
                </span>
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            style={{
              background: '#F5F5F0',
              border: '3px solid #F5F5F0',
              boxShadow: '8px 8px 0 #FFE500',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {[
              { name: 'name', placeholder: 'Your Name', type: 'text', required: true },
              { name: 'email', placeholder: 'Your Email', type: 'email', required: true },
              { name: 'subject', placeholder: 'Subject', type: 'text', required: false },
            ].map((field) => (
              <div key={field.name}>
                <input
                  id={`contact-${field.name}`}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '3px solid #0D0D0D',
                    background: '#F5F5F0',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    outline: 'none',
                    boxShadow: '3px 3px 0 #0D0D0D',
                    transition: 'box-shadow 0.15s',
                  }}
                  onFocus={(e) => (e.target.style.boxShadow = '5px 5px 0 #FFE500')}
                  onBlur={(e) => (e.target.style.boxShadow = '3px 3px 0 #0D0D0D')}
                />
              </div>
            ))}

            <div>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '3px solid #0D0D0D',
                  background: '#F5F5F0',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  outline: 'none',
                  resize: 'vertical',
                  boxShadow: '3px 3px 0 #0D0D0D',
                  transition: 'box-shadow 0.15s',
                }}
                onFocus={(e) => (e.target.style.boxShadow = '5px 5px 0 #FFE500')}
                onBlur={(e) => (e.target.style.boxShadow = '3px 3px 0 #0D0D0D')}
              />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ x: -3, y: -3 }}
              whileTap={{ x: 2, y: 2 }}
              style={{
                background: '#FFE500',
                color: '#0D0D0D',
                border: '3px solid #0D0D0D',
                boxShadow: '6px 6px 0 #0D0D0D',
                padding: '14px 32px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 800,
                fontSize: '1rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                justifyContent: 'center',
                opacity: submitting ? 0.7 : 1,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              <FiSend />
              {submitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

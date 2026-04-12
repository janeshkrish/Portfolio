import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'
import { FiPlus, FiTrash2, FiEdit2, FiLogOut, FiUpload, FiX, FiHome } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../api/client'

const TABS = ['Profile', 'Achievements', 'Experience', 'Projects', 'Certificates', 'Stats']

export default function AdminDashboard() {
  const { isAdmin, logout } = useAdmin()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Profile')

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Access denied. Please log in.')
      navigate('/')
    }
  }, [isAdmin])

  if (!isAdmin) return null

  const handleLogout = () => {
    logout()
    toast.success('Logged out.')
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F0' }}>
      {/* Admin Topbar */}
      <div
        style={{
          background: '#0D0D0D',
          borderBottom: '4px solid #FFE500',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            fontFamily: 'Bebas Neue, cursive',
            fontSize: '1.6rem',
            color: '#FFE500',
            letterSpacing: '3px',
          }}
        >
          Admin<span style={{ color: '#FF3CAC' }}>.</span>Dashboard
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/')}
            className="brutal-btn"
            style={{ background: '#F5F5F0', color: '#0D0D0D', padding: '8px 16px', fontSize: '0.8rem', border: '3px solid #F5F5F0' }}
          >
            <FiHome /> Site
          </button>
          <button
            onClick={handleLogout}
            className="brutal-btn"
            style={{ background: '#FF3CAC', color: '#F5F5F0', padding: '8px 16px', fontSize: '0.8rem', border: '3px solid #FF3CAC' }}
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '3px solid #0D0D0D',
          background: '#0D0D0D',
          padding: '0 24px',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '14px 28px',
              background: activeTab === tab ? '#FFE500' : 'transparent',
              color: activeTab === tab ? '#0D0D0D' : '#A0A0A0',
              border: 'none',
              borderRight: '3px solid rgba(255,255,255,0.1)',
              fontWeight: 800,
              fontFamily: 'Space Grotesk, sans-serif',
              cursor: 'pointer',
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              transition: 'all 0.15s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'Profile' && <ProfileTab />}
            {activeTab === 'Achievements' && <AchievementsTab />}
            {activeTab === 'Experience' && <ExperienceTab />}
            {activeTab === 'Projects' && <ProjectsTab />}
            {activeTab === 'Certificates' && <CertificatesTab />}
            {activeTab === 'Stats' && <StatsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ─────────────────────── PROJECTS TAB ─────────────────────────────── */
function ProjectsTab() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    setLoading(true)
    API.get('/projects')
      .then((r) => setProjects(r.data.data || []))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return
    try {
      await API.delete(`/projects/${id}`)
      toast.success('Project deleted')
      fetchProjects()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>Projects</h2>
        <button
          className="brutal-btn"
          onClick={() => { setEditing(null); setShowForm(true) }}
          style={{ background: '#FFE500', color: '#0D0D0D', padding: '10px 22px', border: '3px solid #0D0D0D' }}
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          initial={editing}
          onClose={() => { setShowForm(false); setEditing(null) }}
          onSaved={() => { fetchProjects(); setShowForm(false); setEditing(null) }}
        />
      )}

      {loading ? (
        <div style={{ display: 'grid', gap: 16 }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 100 }} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {projects.map((p) => (
            <div
              key={p._id}
              style={{
                background: '#fff',
                border: '3px solid #0D0D0D',
                boxShadow: '4px 4px 0 #0D0D0D',
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {p.imageUrl && (
                <img src={p.imageUrl} alt={p.title} style={{ width: 80, height: 60, objectFit: 'cover', border: '2px solid #0D0D0D', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '1rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#555', marginTop: 4 }}>{p.description?.slice(0, 100)}...</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {p.tags?.map((t) => (
                    <span key={t} style={{ background: '#FFE500', border: '2px solid #0D0D0D', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className="brutal-btn"
                  onClick={() => { setEditing(p); setShowForm(true) }}
                  style={{ background: '#2D6CDF', color: '#F5F5F0', padding: '8px 14px', border: '3px solid #0D0D0D', fontSize: '0.8rem' }}
                >
                  <FiEdit2 />
                </button>
                <button
                  className="brutal-btn"
                  onClick={() => handleDelete(p._id)}
                  style={{ background: '#FF3CAC', color: '#F5F5F0', padding: '8px 14px', border: '3px solid #0D0D0D', fontSize: '0.8rem' }}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#888', fontFamily: 'JetBrains Mono', border: '3px dashed #ccc' }}>
              No projects yet. Add your first project!
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ProjectForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    tags: initial?.tags?.join(', ') || '',
    repoUrl: initial?.repoUrl || '',
    liveUrl: initial?.liveUrl || '',
    featured: initial?.featured || false,
  })
  const [image, setImage] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('description', form.description)
      fd.append('tags', JSON.stringify(form.tags.split(',').map((t) => t.trim()).filter(Boolean)))
      fd.append('repoUrl', form.repoUrl)
      fd.append('liveUrl', form.liveUrl)
      fd.append('featured', form.featured.toString())
      if (image) fd.append('image', image)

      if (initial?._id) {
        await API.put(`/projects/${initial._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Project updated!')
      } else {
        await API.post('/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Project added!')
      }
      onSaved()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    border: '3px solid #0D0D0D',
    background: '#F5F5F0',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 600,
    outline: 'none',
    marginBottom: 16,
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '3px solid #0D0D0D',
        boxShadow: '8px 8px 0 #0D0D0D',
        padding: 32,
        marginBottom: 32,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800 }}>{initial ? 'Edit Project' : 'Add New Project'}</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <FiX size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title *" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
        <textarea placeholder="Description *" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required style={{ ...inputStyle, resize: 'vertical' }} />
        <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} style={inputStyle} />
        <input placeholder="Repo URL" value={form.repoUrl} onChange={(e) => setForm((p) => ({ ...p, repoUrl: e.target.value }))} style={inputStyle} />
        <input placeholder="Live URL" value={form.liveUrl} onChange={(e) => setForm((p) => ({ ...p, liveUrl: e.target.value }))} style={inputStyle} />

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, cursor: 'pointer', fontWeight: 700 }}>
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
          Mark as Featured
        </label>

        {/* Image upload */}
        <div
          style={{
            border: '3px dashed #0D0D0D',
            padding: 20,
            textAlign: 'center',
            marginBottom: 20,
            cursor: 'pointer',
            background: image ? '#FFE500' : '#F5F5F0',
          }}
          onClick={() => document.getElementById('project-image-input').click()}
        >
          <FiUpload size={24} style={{ marginBottom: 8 }} />
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
            {image ? image.name : 'Click to upload project image (Cloudinary)'}
          </div>
          <input
            id="project-image-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            type="submit"
            disabled={saving}
            className="brutal-btn"
            style={{ background: '#FFE500', color: '#0D0D0D', padding: '12px 28px', border: '3px solid #0D0D0D', fontSize: '0.9rem' }}
          >
            {saving ? 'Saving...' : initial ? 'Update Project' : 'Add Project'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="brutal-btn"
            style={{ background: '#F5F5F0', color: '#0D0D0D', padding: '12px 28px', border: '3px solid #0D0D0D', fontSize: '0.9rem' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

/* ────────────────────── CERTIFICATES TAB ─────────────────────────── */
function CertificatesTab() {
  const [certs, setCerts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCerts = () => {
    setLoading(true)
    API.get('/certificates')
      .then((r) => setCerts(r.data.data || []))
      .catch(() => toast.error('Failed to load certificates'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCerts() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return
    try {
      await API.delete(`/certificates/${id}`)
      toast.success('Certificate deleted')
      fetchCerts()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>Certificates</h2>
        <button
          className="brutal-btn"
          onClick={() => setShowForm(true)}
          style={{ background: '#FF3CAC', color: '#F5F5F0', padding: '10px 22px', border: '3px solid #0D0D0D' }}
        >
          <FiPlus /> Add Certificate
        </button>
      </div>

      {showForm && (
        <CertForm
          onClose={() => setShowForm(false)}
          onSaved={() => { fetchCerts(); setShowForm(false) }}
        />
      )}

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {[1, 2, 3].map((i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {certs.map((c) => (
            <div
              key={c._id}
              style={{ border: '3px solid #0D0D0D', boxShadow: '4px 4px 0 #0D0D0D', background: '#fff', overflow: 'hidden' }}
            >
              {c.imageUrl && (
                <img src={c.imageUrl} alt={c.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderBottom: '3px solid #0D0D0D' }} />
              )}
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{c.title}</div>
                <div style={{ color: '#555', fontSize: '0.8rem', marginTop: 4 }}>{c.issuer}</div>
                {c.date && <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#888', marginTop: 4 }}>{c.date}</div>}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="brutal-btn"
                  style={{ marginTop: 12, background: '#FF3CAC', color: '#F5F5F0', padding: '6px 14px', border: '2px solid #0D0D0D', fontSize: '0.8rem' }}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
          {certs.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: '#888', fontFamily: 'JetBrains Mono', border: '3px dashed #ccc' }}>
              No certificates yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CertForm({ onClose, onSaved }) {
  const [form, setForm] = useState({ title: '', issuer: '', date: '', credentialLink: '' })
  const [image, setImage] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (image) fd.append('image', image)
      await API.post('/certificates', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Certificate added!')
      onSaved()
    } catch {
      toast.error('Save failed')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px', border: '3px solid #0D0D0D',
    background: '#F5F5F0', fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '0.9rem', fontWeight: 600, outline: 'none', marginBottom: 16,
  }

  return (
    <div style={{ background: '#fff', border: '3px solid #0D0D0D', boxShadow: '8px 8px 0 #FF3CAC', padding: 32, marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h3 style={{ fontWeight: 800 }}>Add Certificate</h3>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><FiX size={24} /></button>
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title *" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required style={inputStyle} />
        <input placeholder="Issuer (e.g. Coursera, NPTEL)" value={form.issuer} onChange={(e) => setForm((p) => ({ ...p, issuer: e.target.value }))} required style={inputStyle} />
        <input placeholder="Date (e.g. Dec 2024)" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} style={inputStyle} />
        <input placeholder="Credential Link" value={form.credentialLink} onChange={(e) => setForm((p) => ({ ...p, credentialLink: e.target.value }))} style={inputStyle} />

        <div
          style={{ border: '3px dashed #0D0D0D', padding: 20, textAlign: 'center', cursor: 'pointer', background: image ? '#FF3CAC' : '#F5F5F0', marginBottom: 20, color: image ? '#F5F5F0' : '#0D0D0D' }}
          onClick={() => document.getElementById('cert-image-input').click()}
        >
          <FiUpload size={22} style={{ marginBottom: 8 }} />
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>{image ? image.name : 'Upload Certificate Image'}</div>
          <input id="cert-image-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={saving} className="brutal-btn" style={{ background: '#FF3CAC', color: '#F5F5F0', padding: '12px 28px', border: '3px solid #0D0D0D' }}>
            {saving ? 'Saving...' : 'Add Certificate'}
          </button>
          <button type="button" onClick={onClose} className="brutal-btn" style={{ background: '#F5F5F0', color: '#0D0D0D', padding: '12px 28px', border: '3px solid #0D0D0D' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

/* ────────────────────────── STATS TAB ─────────────────────────────── */
function StatsTab() {
  const [stats, setStats] = useState({ views: 0, likes: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      API.get('/stats/view').then((r) => r.data.count),
      API.get('/stats/like').then((r) => r.data.count),
    ])
      .then(([views, likes]) => setStats({ views, likes }))
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: 32 }}>Site Stats</h2>
      {loading ? (
        <div style={{ display: 'flex', gap: 24 }}>
          <div className="skeleton" style={{ width: 180, height: 120 }} />
          <div className="skeleton" style={{ width: 180, height: 120 }} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {[
            { label: 'Total Views', value: stats.views.toLocaleString(), color: '#FFE500', emoji: '👁️' },
            { label: 'Total Likes', value: stats.likes.toLocaleString(), color: '#FF3CAC', emoji: '❤️' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: s.color,
                border: '3px solid #0D0D0D',
                boxShadow: '8px 8px 0 #0D0D0D',
                padding: '32px 40px',
                minWidth: 180,
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '3rem', color: '#0D0D0D', letterSpacing: '2px' }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', fontWeight: 700, color: '#0D0D0D', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ────────────────────────── PROFILE TAB ─────────────────────────────── */
function ProfileTab() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    API.get('/profile').then((r) => setForm(r.data.data)).catch(() => toast.error('Failed to load profile'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await API.put('/profile', form)
      toast.success('Profile updated!')
    } catch {
      toast.error('Update failed')
    } finally {
      setSaving(false)
    }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', border: '3px solid #0D0D0D', background: '#F5F5F0', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', fontWeight: 600, outline: 'none', marginBottom: 16 }

  if (!form) return <div className="skeleton" style={{ height: 400 }} />

  return (
    <div style={{ background: '#fff', border: '3px solid #0D0D0D', boxShadow: '8px 8px 0 #00F5FF', padding: 32 }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.8rem', marginBottom: 24 }}>About Me Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Short Bio (Hero)</label>
          <textarea rows={2} value={form.bio || ''} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>About Me Text (About Section)</label>
          <textarea rows={5} value={form.aboutText || ''} onChange={(e) => setForm((p) => ({ ...p, aboutText: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Location</label>
          <input value={form.location || ''} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Email</label>
          <input value={form.email || ''} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Status</label>
          <input value={form.status || ''} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Degree Info</label>
          <input value={form.degree || ''} onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))} style={inputStyle} />
        </div>

        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Degree Title (Box)</label>
          <input value={form.degreeTitle || ''} onChange={(e) => setForm((p) => ({ ...p, degreeTitle: e.target.value }))} style={inputStyle} />
        </div>
        <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>University</label>
          <input value={form.university || ''} onChange={(e) => setForm((p) => ({ ...p, university: e.target.value }))} style={inputStyle} />
        </div>
         <div>
          <label style={{ fontWeight: 700, display: 'block', marginBottom: 8 }}>Education Years</label>
          <input value={form.educationYears || ''} onChange={(e) => setForm((p) => ({ ...p, educationYears: e.target.value }))} style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: 16, borderTop: '3px dashed #0D0D0D', paddingTop: 16 }}>
           <h3 style={{ fontWeight: 800, marginBottom: 16 }}>Hero Stats</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
             <div><label>CGPA</label><input value={form.cgpa || ''} onChange={(e)=>setForm(p=>({...p, cgpa: e.target.value}))} style={inputStyle}/></div>
             <div><label>Internships</label><input value={form.internships || ''} onChange={(e)=>setForm(p=>({...p, internships: e.target.value}))} style={inputStyle}/></div>
             <div><label>Projects Count</label><input value={form.projectsCount || ''} onChange={(e)=>setForm(p=>({...p, projectsCount: e.target.value}))} style={inputStyle}/></div>
             <div><label>Hackathons</label><input value={form.hackathons || ''} onChange={(e)=>setForm(p=>({...p, hackathons: e.target.value}))} style={inputStyle}/></div>
           </div>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" disabled={saving} className="brutal-btn" style={{ background: '#00F5FF', color: '#0D0D0D', padding: '12px 28px', border: '3px solid #0D0D0D', fontSize: '1rem', width: '100%' }}>
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

/* ──────────────────────── ACHIEVEMENTS TAB ───────────────────────── */
function AchievementsTab() {
  const [achievements, setAchievements] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchAchievements = () => {
    setLoading(true)
    API.get('/achievements').then((r) => setAchievements(r.data.data || [])).catch(()=>{}).finally(()=>setLoading(false))
  }
  useEffect(() => { fetchAchievements() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return
    try { await API.delete(`/achievements/${id}`); toast.success('Deleted'); fetchAchievements() } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>Achievements</h2>
        <button onClick={() => setShowForm(true)} className="brutal-btn" style={{ background: '#FFE500', padding: '10px 22px', border: '3px solid #0D0D0D', fontWeight: 700 }}>
          + Add Achievement
        </button>
      </div>

      {showForm && (
        <AchievementForm onClose={() => setShowForm(false)} onSaved={() => {fetchAchievements(); setShowForm(false)}} />
      )}

      {loading ? <div className="skeleton" style={{ height: 200 }} /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {achievements.map((a) => (
            <div key={a._id} style={{ background: '#fff', border: '3px solid #0D0D0D', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ fontSize: '2rem' }}>{a.icon}</div>
               <div style={{ flex: 1 }}>
                 <div style={{ fontWeight: 800 }}>{a.title}</div>
                 <div style={{ fontSize: '0.85rem', color: '#555' }}>{a.description} • {a.date}</div>
               </div>
               <button onClick={() => handleDelete(a._id)} className="brutal-btn" style={{ background: '#FF3CAC', color: '#fff', padding: '8px 16px', border: '3px solid #0D0D0D' }}><FiTrash2 /></button>
            </div>
          ))}
          {achievements.length === 0 && <div style={{ padding: '48px 0', textAlign: 'center', color: '#888', border: '3px dashed #ccc' }}>No achievements yet.</div>}
        </div>
      )}
    </div>
  )
}

function AchievementForm({ onClose, onSaved }) {
  const [form, setForm] = useState({ title: '', description: '', icon: '🏆', date: '' })
  const [saving, setSaving] = useState(false)
  const inputStyle = { width: '100%', padding: '10px 14px', border: '3px solid #0D0D0D', marginBottom: 16, outline: 'none' }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try { await API.post('/achievements', form); toast.success('Added!'); onSaved() } catch { toast.error('Failed') } finally { setSaving(false) }
  }

  return (
    <div style={{ background: '#fff', border: '3px solid #0D0D0D', padding: 32, marginBottom: 32 }}>
       <h3 style={{ fontWeight: 800, marginBottom: 24 }}>New Achievement</h3>
       <form onSubmit={handleSubmit}>
         <input placeholder="Icon (emoji) *" value={form.icon} onChange={e=>setForm(p=>({...p, icon: e.target.value}))} required style={inputStyle} />
         <input placeholder="Title *" value={form.title} onChange={e=>setForm(p=>({...p, title: e.target.value}))} required style={inputStyle} />
         <input placeholder="Description *" value={form.description} onChange={e=>setForm(p=>({...p, description: e.target.value}))} required style={inputStyle} />
         <input placeholder="Date (e.g. 2023)" value={form.date} onChange={e=>setForm(p=>({...p, date: e.target.value}))} style={inputStyle} />
         <div style={{ display: 'flex', gap: 12 }}>
           <button type="submit" disabled={saving} className="brutal-btn" style={{ background: '#FFE500', padding: '10px 24px', border: '3px solid #0D0D0D', fontWeight: 700 }}>Save</button>
           <button type="button" onClick={onClose} className="brutal-btn" style={{ background: '#eee', padding: '10px 24px', border: '3px solid #0D0D0D', fontWeight: 700 }}>Cancel</button>
         </div>
       </form>
    </div>
  )
}

/* ──────────────────────── EXPERIENCE TAB ───────────────────────── */
function ExperienceTab() {
  const [experiences, setExperiences] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchExperiences = () => {
    setLoading(true)
    API.get('/experience').then((r) => setExperiences(r.data.data || [])).catch(()=>{}).finally(()=>setLoading(false))
  }
  useEffect(() => { fetchExperiences() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return
    try { await API.delete(`/experience/${id}`); toast.success('Deleted'); fetchExperiences() } catch { toast.error('Failed') }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>Experience</h2>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="brutal-btn" style={{ background: '#FFE500', padding: '10px 22px', border: '3px solid #0D0D0D', fontWeight: 700 }}>
          + Add Experience
        </button>
      </div>

      {showForm && (
        <ExperienceForm initial={editing} onClose={() => { setShowForm(false); setEditing(null) }} onSaved={() => {fetchExperiences(); setShowForm(false); setEditing(null)}} />
      )}

      {loading ? <div className="skeleton" style={{ height: 200 }} /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experiences.map((e) => (
            <div key={e._id} style={{ background: '#fff', border: '3px solid #0D0D0D', padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
               <div style={{ width: 24, height: 24, background: e.color, border: '2px solid #000' }} />
               <div style={{ flex: 1 }}>
                 <div style={{ fontWeight: 800 }}>{e.role} @ {e.company}</div>
                 <div style={{ fontSize: '0.85rem', color: '#555' }}>{e.period} • {e.side} side</div>
               </div>
               <button onClick={() => { setEditing(e); setShowForm(true) }} className="brutal-btn" style={{ background: '#2D6CDF', color: '#fff', padding: '8px 16px', border: '3px solid #0D0D0D' }}><FiEdit2 /></button>
               <button onClick={() => handleDelete(e._id)} className="brutal-btn" style={{ background: '#FF3CAC', color: '#fff', padding: '8px 16px', border: '3px solid #0D0D0D' }}><FiTrash2 /></button>
            </div>
          ))}
          {experiences.length === 0 && <div style={{ padding: '48px 0', textAlign: 'center', color: '#888', border: '3px dashed #ccc' }}>No experience entries yet.</div>}
        </div>
      )}
    </div>
  )
}

function ExperienceForm({ initial, onClose, onSaved }) {
  const [form, setForm] = useState({
    role: initial?.role || '',
    company: initial?.company || '',
    period: initial?.period || '',
    color: initial?.color || '#FFE500',
    side: initial?.side || 'left',
    points: initial?.points?.join('\n') || '',
    tech: initial?.tech?.join(', ') || ''
  })
  const [saving, setSaving] = useState(false)
  const inputStyle = { width: '100%', padding: '10px 14px', border: '3px solid #0D0D0D', marginBottom: 16, outline: 'none' }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      points: form.points.split('\n').filter(Boolean),
      tech: form.tech.split(',').map(s=>s.trim()).filter(Boolean)
    }
    try {
      if (initial?._id) {
        await API.put(`/experience/${initial._id}`, payload)
        toast.success('Updated!')
      } else {
        await API.post('/experience', payload)
        toast.success('Added!')
      }
      onSaved()
    } catch { toast.error('Failed to save') } finally { setSaving(false) }
  }

  return (
    <div style={{ background: '#fff', border: '3px solid #0D0D0D', padding: 32, marginBottom: 32 }}>
       <h3 style={{ fontWeight: 800, marginBottom: 24 }}>{initial ? 'Edit Experience' : 'New Experience'}</h3>
       <form onSubmit={handleSubmit}>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
           <input placeholder="Role *" value={form.role} onChange={e=>setForm(p=>({...p, role: e.target.value}))} required style={inputStyle} />
           <input placeholder="Company *" value={form.company} onChange={e=>setForm(p=>({...p, company: e.target.value}))} required style={inputStyle} />
           <input placeholder="Period (e.g. 2024)" value={form.period} onChange={e=>setForm(p=>({...p, period: e.target.value}))} required style={inputStyle} />
           <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
             <select value={form.side} onChange={e=>setForm(p=>({...p, side: e.target.value}))} style={{...inputStyle, marginBottom: 0, flex: 1}}>
               <option value="left">Left Side</option>
               <option value="right">Right Side</option>
             </select>
             <input type="color" value={form.color} onChange={e=>setForm(p=>({...p, color: e.target.value}))} style={{...inputStyle, marginBottom: 0, padding: 0, width: 60, height: '100%'}} />
           </div>
         </div>
         <textarea placeholder="Points (one per line) *" value={form.points} onChange={e=>setForm(p=>({...p, points: e.target.value}))} rows={4} required style={inputStyle} />
         <input placeholder="Tech stack (comma separated)" value={form.tech} onChange={e=>setForm(p=>({...p, tech: e.target.value}))} style={inputStyle} />
         
         <div style={{ display: 'flex', gap: 12 }}>
           <button type="submit" disabled={saving} className="brutal-btn" style={{ background: '#FFE500', padding: '10px 24px', border: '3px solid #0D0D0D', fontWeight: 700 }}>Save</button>
           <button type="button" onClick={onClose} className="brutal-btn" style={{ background: '#eee', padding: '10px 24px', border: '3px solid #0D0D0D', fontWeight: 700 }}>Cancel</button>
         </div>
       </form>
    </div>
  )
}


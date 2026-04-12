import { useState, useEffect, useRef } from 'react'
import { FiEye } from 'react-icons/fi'
import API from '../../api/client'

export default function ViewCounter() {
  const [count, setCount] = useState(0)
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    // Register this visit
    API.post('/stats/view')
      .then((r) => setCount(r.data.count))
      .catch(() => {
        API.get('/stats/view')
          .then((r) => setCount(r.data.count))
          .catch(() => {})
      })
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#0D0D0D',
        border: '3px solid #0D0D0D',
        boxShadow: '4px 4px 0 #0D0D0D',
        padding: '10px 16px',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: '0.85rem',
        color: '#FFE500',
        userSelect: 'none',
      }}
      title="Total page views"
    >
      <FiEye size={18} style={{ display: 'block' }} />
      <span>{count.toLocaleString()}</span>
    </div>
  )
}

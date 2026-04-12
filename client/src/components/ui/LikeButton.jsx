import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import API from '../../api/client'

export default function LikeButton() {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    API.get('/stats/like/status')
      .then((r) => {
        setCount(r.data.count)
        setLiked(r.data.liked)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const toggle = async () => {
    if (loading) return
    setBounce(true)
    setTimeout(() => setBounce(false), 400)

    try {
      const res = await API.post('/stats/like')
      setCount(res.data.count)
      setLiked(res.data.liked)
    } catch {}
  }

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      title={liked ? 'Unlike' : 'Like this portfolio'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: liked ? '#FF3CAC' : '#F5F5F0',
        border: '3px solid #0D0D0D',
        boxShadow: liked ? '4px 4px 0 #0D0D0D' : '4px 4px 0 #0D0D0D',
        padding: '10px 16px',
        cursor: 'pointer',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 700,
        fontSize: '0.85rem',
        color: liked ? '#F5F5F0' : '#0D0D0D',
        userSelect: 'none',
      }}
    >
      <motion.span animate={{ scale: bounce ? 1.5 : 1 }} transition={{ duration: 0.2 }}>
        <FiHeart
          size={18}
          fill={liked ? '#F5F5F0' : 'none'}
          style={{ display: 'block' }}
        />
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

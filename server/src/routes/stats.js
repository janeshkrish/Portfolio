import express from 'express';
import Counter from '../models/Counter.js';

const router = express.Router();

const getClientIp = (req) =>
  (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();

// ── VIEW ──────────────────────────────────────────────────────────────────
// GET /stats/view
router.get('/view', async (_, res) => {
  try {
    const doc = await Counter.findOne({ type: 'views' });
    res.json({ success: true, count: doc?.count || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /stats/view  — increment unique view
router.post('/view', async (req, res) => {
  try {
    const ip = getClientIp(req);
    let doc = await Counter.findOne({ type: 'views' });
    if (!doc) {
      doc = new Counter({ type: 'views', count: 1 });
    } else {
      // Simple: just increment every visit (for simplicity; for unique-only, track IPs)
      doc.count += 1;
    }
    await doc.save();
    res.json({ success: true, count: doc.count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── LIKE ──────────────────────────────────────────────────────────────────
// GET /stats/like
router.get('/like', async (_, res) => {
  try {
    const doc = await Counter.findOne({ type: 'likes' });
    res.json({ success: true, count: doc?.count || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /stats/like  — toggle like by IP
router.post('/like', async (req, res) => {
  try {
    const ip = getClientIp(req);
    let doc = await Counter.findOne({ type: 'likes' });
    if (!doc) doc = new Counter({ type: 'likes', count: 0, likedIps: [] });

    const alreadyLiked = doc.likedIps.includes(ip);
    if (alreadyLiked) {
      doc.count = Math.max(0, doc.count - 1);
      doc.likedIps = doc.likedIps.filter((i) => i !== ip);
    } else {
      doc.count += 1;
      doc.likedIps.push(ip);
    }

    await doc.save();
    res.json({ success: true, count: doc.count, liked: !alreadyLiked });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /stats/like/status  — check if current IP has liked
router.get('/like/status', async (req, res) => {
  try {
    const ip = getClientIp(req);
    const doc = await Counter.findOne({ type: 'likes' });
    const liked = doc?.likedIps?.includes(ip) || false;
    res.json({ success: true, liked, count: doc?.count || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

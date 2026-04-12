import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /admin/login  — hidden trigger from contact form
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
  const validPass = process.env.ADMIN_PASS || '-pass';

  if (email === validEmail && password === validPass) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

export default router;

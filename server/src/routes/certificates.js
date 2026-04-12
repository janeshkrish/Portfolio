import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';
import Certificate from '../models/Certificate.js';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const uploadToCloudinary = (buffer, folder = 'portfolio/certificates') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });

// GET /certificates
router.get('/', async (_, res) => {
  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /certificates (admin)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, issuer, date, credentialLink } = req.body;
    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const cert = new Certificate({ title, issuer, date, credentialLink, imageUrl, imagePublicId });
    await cert.save();
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /certificates/:id (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' });
    if (cert.imagePublicId) await cloudinary.uploader.destroy(cert.imagePublicId);
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

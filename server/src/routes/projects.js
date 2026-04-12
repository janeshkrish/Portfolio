import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { authMiddleware } from '../middleware/auth.js';
import Project from '../models/Project.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer — memory storage, then upload to Cloudinary manually
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const uploadToCloudinary = (buffer, folder = 'portfolio/projects') =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });

// ── GET /projects ─────────────────────────────────────────────────────────
router.get('/', async (_, res) => {
  try {
    let projects = await Project.find().sort({ createdAt: -1 });
    // Seed default fallback projects if empty
    if (projects.length === 0) {
      const fb1 = new Project({
        title: 'Roadside Assistance App',
        description: 'A MERN stack app connecting stranded drivers with nearby mechanics. Real-time location tracking, live chat, and OTP-based secure service booking.',
        tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'Maps API'],
        repoUrl: 'https://github.com/janeshkrish',
        liveUrl: '',
        imageUrl: '',
        featured: true,
      });
      const fb2 = new Project({
        title: 'Silent Feedback System',
        description: 'Anonymous HR feedback platform built with PHP & MySQL. Role-based access for HR and employees, secure anonymous submission, admin analytics dashboard.',
        tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
        repoUrl: 'https://github.com/janeshkrish',
        liveUrl: '',
        imageUrl: '',
        featured: true,
      });
      await fb1.save();
      await fb2.save();
      projects = [fb1, fb2];
    }
    res.json({ success: true, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── POST /projects (admin) ────────────────────────────────────────────────
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { title, description, tags, repoUrl, liveUrl, featured } = req.body;
    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const project = new Project({
      title,
      description,
      tags: tags ? JSON.parse(tags) : [],
      repoUrl,
      liveUrl,
      featured: featured === 'true',
      imageUrl,
      imagePublicId,
    });

    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /projects/:id (admin) ──────────────────────────────────────────────
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    const { title, description, tags, repoUrl, liveUrl, featured } = req.body;
    if (title) project.title = title;
    if (description) project.description = description;
    if (tags) project.tags = JSON.parse(tags);
    if (repoUrl !== undefined) project.repoUrl = repoUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (featured !== undefined) project.featured = featured === 'true';

    if (req.file) {
      // Delete old image if exists
      if (project.imagePublicId) {
        await cloudinary.uploader.destroy(project.imagePublicId);
      }
      const result = await uploadToCloudinary(req.file.buffer);
      project.imageUrl = result.secure_url;
      project.imagePublicId = result.public_id;
    }

    await project.save();
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /projects/:id (admin) ───────────────────────────────────────────
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId);
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

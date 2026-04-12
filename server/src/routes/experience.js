import express from 'express';
import Experience from '../models/Experience.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: 1 });
    res.json({ success: true, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { role, company, period, color, side, points, tech } = req.body;
    let pointArr = [];
    if (points) pointArr = typeof points === 'string' ? JSON.parse(points) : points;
    let techArr = [];
    if (tech) techArr = typeof tech === 'string' ? JSON.parse(tech) : tech;

    const newExp = await Experience.create({
      role, company, period, color, side, points: pointArr, tech: techArr
    });
    res.status(201).json({ success: true, data: newExp });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.points && typeof updateData.points === 'string') {
        updateData.points = JSON.parse(updateData.points);
    }
    if (updateData.tech && typeof updateData.tech === 'string') {
        updateData.tech = JSON.parse(updateData.tech);
    }
    const updated = await Experience.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

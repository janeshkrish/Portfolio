import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import projectRoutes from './routes/projects.js';
import certificateRoutes from './routes/certificates.js';
import statsRoutes from './routes/stats.js';
import codingRoutes from './routes/coding.js';
import profileRoutes from './routes/profile.js';
import achievementRoutes from './routes/achievements.js';
import experienceRoutes from './routes/experience.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow Vercel deployments and ANY localhost development port
    if (!origin || /^http:\/\/localhost:\d+$/.test(origin) || /\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/admin', adminRoutes);
app.use('/projects', projectRoutes);
app.use('/certificates', certificateRoutes);
app.use('/stats', statsRoutes);
app.use('/coding', codingRoutes);
app.use('/profile', profileRoutes);
app.use('/achievements', achievementRoutes);
app.use('/experience', experienceRoutes);

app.get('/health', (_, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }));

// ── DB + Boot ───────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

export default app;

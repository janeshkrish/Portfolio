import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    color: { type: String, default: '#FFE500' },
    side: { type: String, enum: ['left', 'right'], default: 'left' },
    points: [{ type: String }],
    tech: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);

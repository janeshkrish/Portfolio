import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '🏆' },
    date: { type: String }, // e.g., "Jan 2024"
  },
  { timestamps: true }
);

export default mongoose.model('Achievement', achievementSchema);

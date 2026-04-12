import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['views', 'likes'], required: true, unique: true },
    count: { type: Number, default: 0 },
    likedIps: [{ type: String }], // track unique IPs for likes
  },
  { timestamps: true }
);

export default mongoose.model('Counter', counterSchema);

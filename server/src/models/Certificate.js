import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true },
    date: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    credentialLink: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Certificate', certificateSchema);

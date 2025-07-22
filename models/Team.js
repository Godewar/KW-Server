import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  profileImage: { type: String }, // path or URL to the uploaded image
}, { timestamps: true });

export default mongoose.model('Team', teamSchema); 
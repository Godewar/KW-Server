import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  metaDescription: String,
  metaKeyword: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('SEO', seoSchema);

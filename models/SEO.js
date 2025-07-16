import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  pageSlug: { type: String, required: true, unique: true },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: [String],
  metaAltTag: String,
}, { timestamps: true });

export default mongoose.model('SEO', seoSchema);

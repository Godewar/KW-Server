import mongoose from 'mongoose';

const subsectionSchema = new mongoose.Schema({
  heading: String,
  body: String,
});

const pageSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  title: String,
  description: String,
  h1: String,
  h2: String,
  h3: String,
  h4: String,
  h5: String,
  h6: String,
  subsections: [subsectionSchema],
  content: String,
  primaryColor: String,
  secondaryColor: String,
  contentImage: String,
  backgroundColor: String,
  backgroundImage: String,
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

export default mongoose.model('Page', pageSchema);
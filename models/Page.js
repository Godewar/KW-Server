import mongoose from 'mongoose';

// MIGRATION INSTRUCTIONS:
// If you get errors after making pageName required, run this in your MongoDB shell or Compass:
// db.pages.updateMany({ pageName: { $exists: false } }, { $set: { pageName: "MIGRATED" } })
// Or delete old documents: db.pages.deleteMany({ pageName: { $exists: false } })
// Then restart your backend server.

const pageSchema = new mongoose.Schema({
  pageName: { type: String, required: true, trim: true },
  // slug field is removed
  backgroundImage: { type: String, trim: true },
  backgroundOverlayContent: { type: String, trim: true },
  status: { 
    type: String, 
    enum: ['draft', 'published'], 
    default: 'draft' 
  },
}, { timestamps: true });

export default mongoose.model('Page', pageSchema);
// routes/leadRoutes.js
import express from 'express';
// import multer from 'multer';
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from '../controllers/leadController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();



router.post('/leads', upload.single('imageUrl'), createLead);       // Create with image upload
router.get('/leads', getAllLeads);       // Read all
router.get('/leads/:id', getLeadById);   // Read one
router.put('/leads/:id', upload.fields([
  { name: 'imageUrl', maxCount: 1 }
]), updateLead);    // Update with image upload
router.delete('/leads/:id', deleteLead); // Delete

export default router;

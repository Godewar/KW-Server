import express from 'express';
import multer from 'multer';
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById
} from '../controllers/blogController.js';

import upload from '../middlewares/upload.js';

const router = express.Router();

// Error handling middleware for multer
const handleMulterError = (error, req, res, next) => {
  console.error('Multer error:', error);
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ error: `Unexpected field: ${error.field}` });
    }
  }
  res.status(500).json({ error: 'File upload error', details: error.message });
};

// Test route without file upload
router.post('/blog-test', (req, res) => {
  console.log('Test route - Request body:', req.body);
  res.json({ message: 'Test route working', body: req.body });
});

// Upload any files but only process coverImage
router.post(
  '/blog',
  upload.any(),
  handleMulterError,
  createBlog
);
router.get('/blogs', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlogById);
router.delete('/blog/:id', deleteBlogById);

export default router;

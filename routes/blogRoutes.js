import express from 'express';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlogBySlug,
  deleteBlogBySlug
} from '../controllers/blogController.js';

import upload from '../middlewares/upload.js';

const router = express.Router();

// router.post('/blog', createBlog);

// Upload both coverImage and contentImage
router.post(
  '/blog',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'contentImage', maxCount: 1 }
  ]),
  createBlog
);
router.get('/blogs', getAllBlogs);
router.get('/blog/:slug', getBlogBySlug);
router.put('/blog/:slug', updateBlogBySlug);
router.delete('/blog/:slug', deleteBlogBySlug);

export default router;

import express from 'express';
import { createOrUpdatePage, getPageBySlug, deletePageBySlug } from '../controllers/pageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();



// Accept both images with field names: 'contentImage' and 'backgroundImage'
router.post(
  '/page',
  upload.fields([
    { name: 'contentImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  createOrUpdatePage
);
router.get('/page/:slug', getPageBySlug);
router.delete('/page/:slug', deletePageBySlug);

export default router;
import express from 'express';
import {
  createOrUpdateSEO,
  getSEOBySlug,
  deleteSEOBySlug
} from '../controllers/seoController.js';

const router = express.Router();

router.post('/seo', createOrUpdateSEO);
router.get('/seo/:slug', getSEOBySlug);
router.delete('/seo/:slug', deleteSEOBySlug);

export default router;
import express from 'express';
import { createSEO, getAllSEO, getSEOById, updateSEO, deleteSEO } from '../controllers/seoController.js';

const router = express.Router();

router.post('/seo', createSEO);
router.get('/seo', getAllSEO);
router.get('/seo/:id', getSEOById);
router.put('/seo/:id', updateSEO);
router.delete('/seo/:id', deleteSEO);

export default router;
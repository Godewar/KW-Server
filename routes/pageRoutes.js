import express from 'express';
import {
  createPage,
  getPageById,
  updatePageById,
  deletePageById,
  getAllPages
} from '../controllers/pageController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

// CREATE
router.post(
  '/page',
  upload.fields([
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  createPage
);

// READ ONE
router.get('/page/:id', getPageById);

// GET ALL PAGES
router.get('/pages', getAllPages);

// UPDATE
router.put(
  '/page/:id',
  upload.fields([
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  updatePageById
);

// DELETE
router.delete('/page/:id', deletePageById);

export default router;
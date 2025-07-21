import Page from '../models/Page.js';

// CREATE
export const createPage = async (req, res) => {
  try {
    const { pageName } = req.body;
    if (!pageName) {
      return res.status(400).json({ error: 'Page Name is required' });
    }
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || req.body.backgroundImage;
    const page = new Page({
      pageName,
      backgroundImage,
      backgroundOverlayContent: req.body.backgroundOverlayContent || ''
    });
    const saved = await page.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page', details: error.message });
  }
};

// READ
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get page' });
  }
};

// GET ALL PAGES
export const getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pages', details: error.message });
  }
};

// UPDATE
export const updatePageById = async (req, res) => {
  try {
    const { backgroundOverlayContent, pageName } = req.body;
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || req.body.backgroundImage;
    const updateFields = {};
    if (backgroundImage) updateFields.backgroundImage = backgroundImage;
    if (backgroundOverlayContent !== undefined) updateFields.backgroundOverlayContent = backgroundOverlayContent;
    if (pageName !== undefined) updateFields.pageName = pageName;
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page', details: error.message });
  }
};

// DELETE
export const deletePageById = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    if (!deletedPage) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Page deletion failed' });
  }
};

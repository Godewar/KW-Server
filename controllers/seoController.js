import SEO from '../models/SEO.js';

export const createSEO = async (req, res) => {
  try {
    const seo = new SEO(req.body);
    await seo.save();
    res.status(201).json({ message: 'SEO entry created', seo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating SEO entry', error: error.message });
  }
};

export const getAllSEO = async (req, res) => {
  try {
    const seoEntries = await SEO.find().sort({ createdAt: -1 });
    res.json(seoEntries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO entries', error: error.message });
  }
};

export const getSEOById = async (req, res) => {
  try {
    const seo = await SEO.findById(req.params.id);
    if (!seo) return res.status(404).json({ message: 'SEO entry not found' });
    res.json(seo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching SEO entry', error: error.message });
  }
};

export const updateSEO = async (req, res) => {
  try {
    const updatedSEO = await SEO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSEO) return res.status(404).json({ message: 'SEO entry not found' });
    res.json({ message: 'SEO entry updated', seo: updatedSEO });
  } catch (error) {
    res.status(500).json({ message: 'Error updating SEO entry', error: error.message });
  }
};

export const deleteSEO = async (req, res) => {
  try {
    const deletedSEO = await SEO.findByIdAndDelete(req.params.id);
    if (!deletedSEO) return res.status(404).json({ message: 'SEO entry not found' });
    res.json({ message: 'SEO entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting SEO entry', error: error.message });
  }
};

import SEO from '../models/SEO.js';

// Create or Update SEO
export const createOrUpdateSEO = async (req, res) => {
  const { pageSlug, metaTitle, metaDescription, metaKeywords, metaAltTag } = req.body;

  try {
    const seo = await SEO.findOneAndUpdate(
      { pageSlug },
      { metaTitle, metaDescription, metaKeywords, metaAltTag },
      { upsert: true, new: true }
    );
    res.status(200).json(seo);
  } catch (error) {
    res.status(500).json({ error: 'SEO update failed' });
  }
};

// Get SEO by Slug
export const getSEOBySlug = async (req, res) => {
  try {
    const seo = await SEO.findOne({ pageSlug: req.params.slug });
    if (!seo) return res.status(404).json({ error: 'SEO not found' });
    res.status(200).json(seo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve SEO data' });
  }
};

// Delete SEO by Slug
export const deleteSEOBySlug = async (req, res) => {
  try {
    const deletedSEO = await SEO.findOneAndDelete({ pageSlug: req.params.slug });
    if (!deletedSEO) return res.status(404).json({ error: 'SEO not found' });
    res.status(200).json({ message: 'SEO deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'SEO deletion failed' });
  }
};

import Page from '../models/Page.js';


export const createOrUpdatePage = async (req, res) => {
  try {
    const {
      pageName,
      slug,
      title,
      description,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      subsections,
      content,
      primaryColor,
      secondaryColor,
      backgroundColor,
      status
    } = req.body;

    // Handle file uploads
    const backgroundImage = req.files?.backgroundImage?.[0]?.path || req.body.backgroundImage;
    const contentImage = req.files?.contentImage?.[0]?.path || req.body.contentImage;

    const page = await Page.findOneAndUpdate(
      { slug },
      {
        pageName,
        title,
        description,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        subsections,
        content,
        primaryColor,
        secondaryColor,
        contentImage,
        backgroundColor,
        backgroundImage,
        status
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Page update failed', details: error.message });
  }
};
       

export const getPageBySlug = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get page' });
  }
};

export const deletePageBySlug = async (req, res) => {
  try {
    const deletedPage = await Page.findOneAndDelete({ slug: req.params.slug });
    if (!deletedPage) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Page deletion failed' });
  }
};

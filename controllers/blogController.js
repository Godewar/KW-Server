import Blog from '../models/Blog.js';

// Create blog
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      author,
      tags,
      category,
      isPublished,
      publishedAt
    } = req.body;

    const contentImage = req.files?.contentImage?.[0]?.path;
    const coverImage = req.files?.coverImage?.[0]?.path;

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      author,
      tags,
      category,
      isPublished,
      publishedAt,
      contentImage,
      coverImage
    });

    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog', details: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};

// Get blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get blog' });
  }
};

// Update blog
export const updateBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog', details: error.message });
  }
};

// Delete blog
export const deleteBlogBySlug = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

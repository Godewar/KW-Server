import Blog from '../models/Blog.js';

// Create blog
export const createBlog = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    const {
      title,
      content,
      author,
      tags,
      isPublished,
      publishedAt
    } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Find coverImage file from files array
    const coverImageFile = req.files?.find(file => file.fieldname === 'coverImage');
    const coverImage = coverImageFile?.path;
    console.log('Cover image path:', coverImage);

    const blogData = {
      title,
      content,
      author: author || '',
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []),
      isPublished: isPublished === 'true' || isPublished === true,
      publishedAt: publishedAt || null,
      coverImage: coverImage || null
    };

    console.log('Blog data to save:', blogData);

    const blog = new Blog(blogData);
    const saved = await blog.save();
    console.log('Blog saved successfully:', saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating blog:', error);
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

// Get blog by id
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get blog' });
  }
};

// Update blog
export const updateBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
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
export const deleteBlogById = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
};

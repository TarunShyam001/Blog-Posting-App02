const { where } = require('sequelize');
const Blog = require('../models/blogs');

exports.postAddBlogs = async (req, res) => {
  const { title, author,content } = req.body; 
  try {
    const blog = await Blog.create({ title,author,content }); 
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteBlog= async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ err: 'Blog not found' });
    }

    await blog.destroy();

    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting Blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

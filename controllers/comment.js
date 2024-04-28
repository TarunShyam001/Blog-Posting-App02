const { where } = require('sequelize');
const Comment = require('../models/comments');

exports.postAddComment = async (req, res) => {
    const { commentInput} = req.body; 
    try {
      const comment = await Comment.create({ commentInput }); 
      res.status(201).json(comment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
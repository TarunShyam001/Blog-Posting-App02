const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/blogs', adminController.getAllBlogs);

router.post('/blogs', adminController.postAddBlogs);

 router.delete('/blog/:id', adminController.deleteBlog);


module.exports = router;
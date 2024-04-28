const path = require('path');

const express = require('express');

const adminController = require('../controllers/comment');

const router = express.Router();

router.post('blogs/:id/comments', adminController.postAddComment);

module.exports = router;
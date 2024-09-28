// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/search/:username', PostController.searchPosts);

module.exports = router;
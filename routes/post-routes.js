// Server/routes/post-routes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/search', authenticate, PostController.searchPosts);
router.get('/favorite', authenticate, PostController.getFavoritePostsByUsername);
router.get('/myPosts', authenticate, PostController.getMyPostsByUsername);
router.get('/post_id/:post_id', authenticate, PostController.getPostById);
router.post('/', authenticate, PostController.createPost);
router.patch('/', authenticate, PostController.updatePost);
router.patch('/change-status', authenticate, PostController.changePostStatus)
router.patch('/change-active', authenticate, PostController.changePostActive)

module.exports = router;

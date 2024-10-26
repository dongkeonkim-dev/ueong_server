// Server/routes/post-routes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');

router.get('/search/username/:username', PostController.searchPosts);
router.get('/favorite/username/:username', PostController.getFavoritePostsByUsername);
router.get('/myPosts/username/:username', PostController.getMyPostsByUsername);
router.get('/post_id/:post_id/username/:username/', PostController.getPostById);
router.post('/', PostController.createPost);
router.patch('/change-status', PostController.changePostStatus)
router.patch('/change-active', PostController.changePostActive)

module.exports = router;

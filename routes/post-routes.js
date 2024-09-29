// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/search/:username', PostController.searchPosts);
router.get('/favorite/by-username/:username', PostController.getFavoritePostsByUsername);
router.get('/myPosts/by-username/:username', PostController.getMyPostsByUsername);

module.exports = router;
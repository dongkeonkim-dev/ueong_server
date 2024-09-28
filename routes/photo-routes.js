// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photo-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/by-post-id/:postId', PhotoController.getPhotosByPostId);

module.exports = router;
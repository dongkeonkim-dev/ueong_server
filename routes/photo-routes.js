// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photo-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/postId/:postId', authenticate, PhotoController.getPhotosByPostId);
router.get('/postIds', authenticate, PhotoController.getPhotosByPostIds);
router.post('/', authenticate, PhotoController.uploadPhotoFiles);
module.exports = router;

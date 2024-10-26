// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photo-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/postId/:postId', PhotoController.getPhotosByPostId);
router.get('/postIds', PhotoController.getPhotosByPostIds);
router.post('/', PhotoController.uploadPhotoFiles);
module.exports = router;

// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const ArController = require('../controllers/ar-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/postId/:postId', authenticate, ArController.getModelByPostId);
router.post('/', authenticate, ArController.uploadModelFile);

module.exports = router;
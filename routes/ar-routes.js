// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const ArController = require('../controllers/ar-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/post_id/:post_id', authenticate, ArController.getModelByPostId);
router.post('/', authenticate, ArController.uploadModelFile);

module.exports = router;

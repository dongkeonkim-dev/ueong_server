// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PostSearchHistoryController = require('../controllers/post-search-history-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/', authenticate, PostSearchHistoryController.getHistoryByUsername);
router.delete('/', authenticate, PostSearchHistoryController.deleteHistoryBySearchTerm);

module.exports = router;

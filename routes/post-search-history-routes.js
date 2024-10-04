// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PostSearchHistoryController = require('../controllers/post-search-history-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', PostSearchHistoryController.getHistoryByUsername);
router.delete('/', PostSearchHistoryController.deleteHistoryBySearchTerm);

module.exports = router;

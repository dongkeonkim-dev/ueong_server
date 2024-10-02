// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const PostSearchHistoryController = require('../controllers/post-search-history-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/by-username/:username', PostSearchHistoryController.getHistoryByUsername);
router.delete('/delete-by-searchTerm/:username/:searchTerm', PostSearchHistoryController.deleteHistoryBySearchTerm);

module.exports = router;

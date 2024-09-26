// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chat-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/by-username/:username', ChatController.getChatsByUsername);

module.exports = router;

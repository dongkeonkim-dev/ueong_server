// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', MessageController.getMessagesByChatter);

module.exports = router;

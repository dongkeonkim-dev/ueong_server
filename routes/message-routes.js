// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/message-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/by-chatter/:username/:chatter', MessageController.getMessagesByChatter);

module.exports = router;

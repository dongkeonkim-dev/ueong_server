// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/by-username/:username', authenticate, UserController.getUserByUsername);

module.exports = router;

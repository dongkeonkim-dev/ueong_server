// Server/routes/auth-routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.post('/login', AuthController.login);
router.post('/logout', authenticate, AuthController.logout);
router.get('/validate-token', authenticate, AuthController.validateToken);

module.exports = router;

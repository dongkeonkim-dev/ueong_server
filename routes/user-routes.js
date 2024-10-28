// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', authenticate, UserController.getUserByUsername);
router.get('/', authenticate, UserController.getUser);
router.patch('/', authenticate, UserController.updateUser);
router.patch('/deactivate', authenticate, UserController.deactivateUser);

module.exports = router;

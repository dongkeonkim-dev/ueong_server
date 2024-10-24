// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', UserController.getUserByUsername);
router.patch('/',  UserController.updateUser);

module.exports = router;

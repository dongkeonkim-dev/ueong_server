// Server/routes/user-routes.js
const express = require('express');
const { uploadImage } = require('../middlewares/multer-middleware');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', UserController.getUserByUsername);
router.post('/edit-user',  UserController.savePhotoAndUpdateUser);

module.exports = router;

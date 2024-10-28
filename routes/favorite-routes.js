// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/favorite-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.post('/', authenticate, FavoriteController.addFavorite);
router.delete('/', authenticate, FavoriteController.deleteFavorite);

module.exports = router;

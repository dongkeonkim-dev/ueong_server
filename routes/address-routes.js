// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/emdId/:emdId', AddressController.getFullAddressById);
router.get('/search', AddressController.searchAddress);
router.post('/add', AddressController.addMyVillage);

module.exports = router;

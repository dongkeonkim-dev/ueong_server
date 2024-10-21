// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/full/emdId/:emdId', AddressController.getFullAddressById);
router.get('/emd/emdId/:emdId', AddressController.getEmd);
router.get('/search', AddressController.searchAddress);

module.exports = router;

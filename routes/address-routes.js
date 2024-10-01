// Server/routes/user-routes.js
const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/address-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/full-address-by-id/:emdId', AddressController.getFullAddressById);

module.exports = router;
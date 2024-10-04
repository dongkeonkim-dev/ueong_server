const express = require('express');
const router = express.Router();
const MyVillageController = require('../controllers/my-village-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', MyVillageController.getMyVillageByUsername);

module.exports = router;

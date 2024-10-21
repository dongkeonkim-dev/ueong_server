const express = require('express');
const router = express.Router();
const MyVillageController = require('../controllers/my-village-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/username/:username', MyVillageController.getMyVillageByUsername);
router.post('/add', MyVillageController.addMyVillage);


module.exports = router;

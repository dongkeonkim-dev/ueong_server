const express = require('express');
const router = express.Router();
const MyVillageController = require('../controllers/my-village-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/', authenticate, MyVillageController.getMyVillageByUsername);
router.post('/add', authenticate, MyVillageController.addMyVillage);


module.exports = router;

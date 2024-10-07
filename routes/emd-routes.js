const express = require('express');
const router = express.Router();
const EmdController = require('../controllers/emd-controller');
const { authenticate } = require('../middlewares/auth-middleware');

router.get('/my-village/username/:username', EmdController.getMyVillageByUsername);
router.get('/emdId/:emdId', EmdController.getEmd);

module.exports = router;

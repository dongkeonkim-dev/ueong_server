// Server/routes/image-routes.js
const express = require('express');
const router = express.Router();
const path = require('path');

// 이미지 반환 API
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../uploads', 'images', filename); // 이미지 경로 설정
    res.sendFile(imagePath, (err) => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

module.exports = router;

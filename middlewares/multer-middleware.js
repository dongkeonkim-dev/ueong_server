// middlewares/multerMiddleware.js
// middlewares/multerMiddleware.js
const multer = require('multer');
const path = require('path');

// 멀티 파일 업로드 설정 (이미지와 3D 모델)
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            if (file.fieldname === 'images') {
                cb(null, 'uploads/images'); // 이미지 저장 경로
            } else if (file.fieldname === 'model') {
                cb(null, 'uploads/3d-models'); // 3D 모델 저장 경로
            } else {
                cb(new Error('Invalid file fieldname'), null);
            }
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB 제한
});

// JSON 데이터를 수동으로 파싱하는 함수
function parseJson(req) {
    if (req.body && req.body.json) {
        try {
            req.parsedBody = JSON.parse(req.body.json);
        } catch (error) {
            throw new Error('Invalid JSON format');
        }
    }
}

// 이미지와 3D 모델 파일을 동시에 업로드하는 미들웨어
function uploadFiles(req, res, next) {
    // 파일 필드는 존재하더라도 없어도 괜찮게끔 설정
    upload.fields([
        { name: 'images', maxCount: 10 },
        { name: 'model', maxCount: 1 }
    ])(req, res, (err) => {
        if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') {
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }

        try {
            parseJson(req); // JSON 데이터 파싱
        } catch (parseError) {
            return res.status(400).json({ error: parseError.message });
        }
        next();
    });
}

module.exports = {
    uploadFiles
};

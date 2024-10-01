// middlewares/multerMiddleware.js
const multer = require('multer');
const path = require('path');

// 이미지 파일 업로드 설정
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images'); // 이미지 저장 경로
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// 3D 모델 파일 업로드 설정
const modelStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/3d-models'); // 3D 모델 저장 경로
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 10 * 1024 * 1024 }}); // 10MB 제한
const uploadModel = multer({ storage: modelStorage, limits: { fileSize: 10 * 1024 * 1024 }}); // 10MB 제한

module.exports = { uploadImage, uploadModel };

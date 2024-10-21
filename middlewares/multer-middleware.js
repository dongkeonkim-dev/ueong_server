const multer = require('multer');
const path = require('path');
const { HttpError } = require('../utils/delete/checkIf'); // HttpError를 import

// 파일 저장 경로 설정
const setDestination = (req, file, cb) => {
    if (file.fieldname === 'image') {
        cb(null, 'uploads/images'); // 이미지 저장 경로
    } else if (file.fieldname === 'model') {
        cb(null, 'uploads/3d-models'); // 3D 모델 저장 경로
    } else {
        cb(new HttpError('Invalid file fieldname', 400), null); // HttpError로 변환
    }
};

// 파일 이름 설정
const setFilename = (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
};

// 멀티 파일 업로드 설정 (이미지와 3D 모델)
const storage = multer.diskStorage({
    destination: setDestination, // destination 함수를 인수로 전달
    filename: setFilename // filename 함수를 인수로 전달
});

// multer 설정
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB 제한
});

// 이미지와 3D 모델 파일을 동시에 업로드하는 미들웨어
const uploadFiles = (req, res, next) => {
    upload.fields([
        { name: 'image', maxCount: 10 },
        { name: 'model', maxCount: 1 }
    ])(req, res, (err) => {
        if (err) return next(new HttpError('File upload failed', 500)); // 에러 발생 시 HttpError로 변환

        // 업로드된 파일 이름을 가져오기
        const uploadedImages = req.files['image'] || [];
        const uploadedModel = req.files['model'] ? req.files['model'][0] : null;

        // 파일 이름을 다음 미들웨어로 전달
        req.uploadedFiles = {
            images: uploadedImages.map(file => file.filename), // 배열로 변환
            model: uploadedModel ? uploadedModel.filename : null
        };

        next();
    });
};

module.exports = { uploadFiles };

// Server/controller/chat-controller.js
const ArRepository = require('../repositories/ar-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { AR_PATH } = require('../config/constants');
const { log } = require('../utils/log');

class ArController {
    static async getModelByPostId(req, res) {
        const postId = req.params.postId;
        const model = await ArRepository.getModelByPostId(postId);
        res.json(model);
        
    }

    static async uploadModelFile(req, res) {
        uploadFiles(req, res, async (err) => {
            if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처

            const model_name = req.uploadedFiles.model_name
            const models = {model_path: `${AR_PATH}${model_name}`}


        })
    }

    
}

module.exports = ArController;

// Server/controller/chat-controller.js
const ArRepository = require('../repositories/ar-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { AR_PATH } = require('../config/constants');
const { log } = require('../utils/log');

class ArController {
  static async getModelByPostId(req, res) {
    const postId = req.params.postId;
    const models = await ArRepository.getArModelByPostId(postId);
    res.json(models);
  }

  static async uploadModelFile(req, res) {
    uploadFiles(req, res, async (err) => {
      if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리
      const model = req.uploadedFiles.model_name.map((model_name) => ({
        ar_model_directory: `${AR_PATH}${model_name}`,
      }));
      const [createId] = await ArRepository.createArModelRows(model);
      res.json({ createId });
    });
  }
}

module.exports = ArController;

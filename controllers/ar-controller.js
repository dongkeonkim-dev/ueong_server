// Server/controller/chat-controller.js
const ArRepository = require('../repositories/ar-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { AR_PATH } = require('../config/constants');
const { ArModel } = require('../utils/validation/schemas');
const { log } = require('../utils/log');

class ArController {
  static async getModelByPostId(req, res) {
    const input = ArModel.pick({ post_id: true }).parse(req.params);
    const [model] = await ArRepository.getArModelByPostId(input.post_id);
    res.json(model);
  }

  static async uploadModelFile(req, res) {
    uploadFiles(req, res, async (err) => {
      if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리
      const model = req.uploadedFiles.model_name.map((model_name) => ({
        ar_model_directory: `${AR_PATH}${model_name}`,
      }));
      const [createId] = await ArRepository.createArModelRows(model);
      const createdModel = await ArRepository.getArModelById(createId);
      res.json(createdModel);
    });
  }
}

module.exports = ArController;

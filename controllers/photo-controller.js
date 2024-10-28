// Server/controller/chat-controller.js
const PhotoRepository = require('../repositories/photo-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { IMAGE_PATH } = require('../config/constants');
const { log } = require('../utils/log');

class PhotoController {
  static async getPhotosByPostId(req, res) {
    const postId = req.params.postId;
    const photos = await PhotoRepository.getPhotosByPostId(postId);
    res.json(photos);
  }

  static async getPhotosByPostIds(req, res) {
    const postIds = req.query.postIds;
    const photos = await PhotoRepository.getPhotosByPostIds(postIds);
    res.json(photos);
  }
  

  static async uploadPhotoFiles(req, res) {
    uploadFiles(req, res, async (err) => {
      if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리
      const photos = req.uploadedFiles.image_names.map((photo_name) => ({
        photo_path: `${IMAGE_PATH}${photo_name}`,
      }));
      const createIds = await PhotoRepository.createPhotoRows(photos);
      log(createIds)
      const createdPhotos = await PhotoRepository.getPhotosByIds(createIds);
      log(createdPhotos)
      res.json({ createdPhotos });
    });
  }
}

module.exports = PhotoController;

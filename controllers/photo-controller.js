// Server/controller/chat-controller.js
const PhotoRepository = require('../repositories/photo-repository');

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
}

module.exports = PhotoController;

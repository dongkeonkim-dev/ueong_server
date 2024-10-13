// Server/controller/chat-controller.js
const Photos = require('../models/photos');

class PhotoController {
    static async getPhotosByPostId(req, res) {
        const postId = req.params.postId;

        try {
            const photos = await Photos.getPhotosByPostId(postId);
            console.log(`Fetched ${photos.length} photos for postId: ${postId}`);

            // 사진이 없을 경우에도 빈 배열 반환
            res.json(photos);
        } catch (err) {
            console.error("Error searching Photo: ", err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }


}

module.exports = PhotoController;

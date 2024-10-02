// Server/controller/chat-controller.js
const Photos = require('../models/photos');

class PhotoController {
    static async getPhotosByPostId(req, res) {
        const postId = req.params.postId;

        try {
            const photos = await Photos.getPhotosByPostId(postId);
            if (photos.length > 0) { // 수정: posts가 배열이므로 길이 확인
                //console.log("Photos found: ", photos); // 응답 로그 추가
                res.json(photos);
            } else {
                console.log("Photos not found: ", postId); // 응답 로그 추가
                res.status(404).json({ message: 'Photos not found' });
            }
        } catch (err) {
            console.error("Error searching Photo: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }


}

module.exports = PhotoController;

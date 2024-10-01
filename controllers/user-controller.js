// Server/controller/user-controller.js
const Users = require('../models/users');
const { uploadImage } = require('../middlewares/multer-middleware');
const fs = require('fs'); // 파일 삭제를 위해 fs 모듈 사용
const path = require('path');

class UserController {
    static async getUserByUsername(req, res) {
        const username = req.params.username;
        try {
            const user = await Users.getUserByUsername(username);
            if (user) {
                console.log("User found: ", user); // 응답 로그 추가
                res.json(user);
            } else {
                console.log("User not found: ", username); // 응답 로그 추가
                res.status(404).json({ message: 'User not found' });
            }
        } catch (err) {
            console.error("Error fetching user: ", err); // 오류 로그 추가
            res.status(500).json({ message: err.message });
        }
    }

    static savePhotoAndUpdateUser(req, res) {
        // 파일 업로드 미들웨어 실행
        uploadImage.single('file')(req, res, async function (err) {
            if (err && err.code !== 'LIMIT_UNEXPECTED_FILE') {
                return res.status(500).json({ message: 'Image upload failed', error: err.message });
            }

            try {
                const { username, email, nickname, password } = req.body;

                // 이전 사용자 데이터 가져오기
                const user = await Users.getUserByUsername(username);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                var profilePhotoUrl = user.profile_photo_url; // 기본값으로 이전의 프로필 사진 URL 사용

                // 파일이 첨부된 경우에만 사진을 교체
                if (req.file) {
                    // 이전 프로필 사진 삭제
                    if (user.profile_photo_url) {
                        const previousPhotoPath = path.join(__dirname, '..', user.profile_photo_url);
                        fs.unlink(previousPhotoPath, (unlinkErr) => {
                            if (unlinkErr) {
                                console.error(`Error deleting old profile photo: ${unlinkErr.message}`);
                            } else {
                                console.log(`Previous profile photo deleted: ${previousPhotoPath}`);
                            }
                        });
                    }
                    // 새로 업로드된 프로필 사진 URL
                    profilePhotoUrl = `/uploads/images/${req.file.filename}`;
                }

                // 사용자 업데이트
                const updatedUserData = {
                    username,
                    email,
                    nickname,
                    profilePhotoUrl,
                    password
                };

                const updateSuccess = await Users.updateUser(updatedUserData);
                if (updateSuccess) {
                    res.status(200).json({ message: 'User updated successfully', profilePhotoUrl });
                } else {
                    res.status(500).json({ message: 'Failed to update user' });
                }
            } catch (error) {
                console.error("Error updating user: ", error);
                res.status(500).json({ message: 'Failed to update user', error: error.message });
            }
        });
    }
}

module.exports = UserController;

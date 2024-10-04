const Users = require('../models/users');
const { uploadFiles } = require('../middlewares/multer-middleware');
const fs = require('fs');
const path = require('path');

class UserController {
    static async savePhotoAndUpdateUser(req, res) {
        try {
            const contentType = req.headers['content-type'];

            // 파일 업로드 및 JSON 파싱 처리
            if (contentType && contentType.includes('multipart/form-data')) {
                uploadFiles(req, res, async (err) => {
                    if (err) {
                        console.error('Error uploading files:', err);
                        return res.status(500).json({ message: 'File upload failed', error: err.message });
                    }

                    await UserController.processUserUpdate(req, res);
                });
            } else if (contentType && contentType.includes('application/json')) {
                // application/json 요청일 경우 - 일반적인 데이터만 처리
                await UserController.processUserUpdate(req, res);
            } else {
                res.status(400).json({ message: 'Unsupported content type' });
            }
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async processUserUpdate(req, res) {
        try {
            // 사용자 정보 가져오기
            const user = await UserController.getUser(req);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // 프로필 사진 업데이트 처리
            let profilePhotoUrl = user.profile_photo_url;

            if (req.files && req.files.images && req.files.images.length > 0) {
                // 새 프로필 사진 설정
                profilePhotoUrl = `/uploads/images/${req.files.images[0].filename}`;

                // 이전 프로필 사진 삭제
                await UserController.deleteOldPhoto(user.profile_photo_url);
            }

            // 사용자 데이터 업데이트
            await UserController.updateUser(req, res, profilePhotoUrl);
        } catch (error) {
            console.error('Error processing user update:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    static async getUser(req) {
        try {
            const username = req.body.username || (req.parsedBody && req.parsedBody.username);
            if (!username) {
                throw new Error('Username is required');
            }

            const user = await Users.getUserByUsername(username);
            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }

    static async deleteOldPhoto(profilePhotoUrl) {
        if (profilePhotoUrl) {
            const previousPhotoPath = path.join(__dirname, '..', profilePhotoUrl);
            fs.unlink(previousPhotoPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error(`Error deleting old profile photo: ${unlinkErr.message}`);
                } else {
                    console.log(`Previous profile photo deleted: ${previousPhotoPath}`);
                }
            });
        }
    }

    static async updateUser(req, res, profilePhotoUrl = null) {
        try {
            const { username, email, nickname } = req.parsedBody || req.body;

            const updatedUserData = {
                username,
                email,
                nickname,
                profile_photo_url: profilePhotoUrl || req.body.profile_photo_url
            };

            const updateSuccess = await Users.updateUser(updatedUserData);
            if (updateSuccess) {
                res.status(200).json({
                    message: 'User updated successfully',
                    profile_photo_url: updatedUserData.profile_photo_url
                });
            } else {
                res.status(500).json({ message: 'Failed to update user' });
            }
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Failed to update user', error: error.message });
        }
    }
}

module.exports = UserController;

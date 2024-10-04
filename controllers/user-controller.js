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

    static async getUserByUsername(req, res) {
        try {
            const username = req.body.username || req.params.username; // req.body에서 username을 가져오거나 params에서 가져옵니다.
            if (!username) {
                return res.status(400).json({ message: 'Username is required' }); // username이 없을 경우 400 에러 응답
            }
    
            const user = await Users.getUserByUsername(username); // 데이터베이스에서 사용자 정보를 가져옵니다.
            if (user) {
                console.log("User found: ", user); // 사용자 정보가 존재할 경우
                return res.json(user); // 사용자 정보를 JSON 형태로 응답합니다.
            } else {
                console.log("User not found: ", username); // 사용자를 찾지 못했을 경우
                return res.status(404).json({ message: 'User not found' }); // 404 에러 응답
            }
        } catch (error) {
            console.error('Error fetching user:', error); // 오류 발생 시 콘솔에 로그
            return res.status(500).json({ message: 'Internal server error', error: error.message }); // 서버 내부 오류 응답
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

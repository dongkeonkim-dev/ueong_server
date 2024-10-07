const Users = require('../models/users');
const { uploadFiles } = require('../middlewares/multer-middleware');
const fs = require('fs');
const path = require('path');

const { HttpError, validate, success } = require('../utils/handlers');

class UserController {
    static async savePhotoAndUpdateUser(req, res, next) {
        try {
            if (req.is('multipart/form-data')) {
                await UserController.handleMultipartFormData(req, res, next);
            } else if (req.is('application/json')) {
                await UserController.handleJsonRequest(req, res, next);
            } else {
                throw new HttpError('Unsupported Content-Type', 400);
            }
        } catch (error) { next(error); }
    }

    static async handleMultipartFormData(req, res, next) {
        //멀터 미들웨어 사용
        uploadFiles(req, res, async (err) => {
            if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리

            const user = await Users.getUserByUsername(req.body.username);
            validate(user, 'User not found', 404); // 사용자 존재 확인

            let profileImageUrl = user.profile_photo_url;

            if (req.uploadedFiles.images?.length) {
                profileImageUrl = `/uploads/images/${req.uploadedFiles.images[0]}`;
                await UserController.deleteOldPhoto(user.profile_photo_url);
            }

            await UserController.updateUser(req, res, profileImageUrl);
        });
    }

    static async handleJsonRequest(req, res, next) {
        try {
            const user = await Users.getUserByUsername(req.body.username);
            validate(user, 'User not found', 404); // 사용자 존재 확인

            await UserController.updateUser(req, res, user.profile_photo_url);
        } catch (error) { next(error); }
    }

    static async getUserByUsername(req, res, next) {
        try {
            const username = req.body.username || req.params.username;
            validate(username, 'Username is required', 400); // 유효성 검사

            const user = await Users.getUserByUsername(username);
            validate(user, 'User not found', 404); // 사용자 존재 확인

            return res.json(user);
        } catch (error) { next(error); }
    }

    static async deleteOldPhoto(profileImageUrl) {
        if (profileImageUrl) {
            const previousPhotoPath = path.join(__dirname, '..', profileImageUrl);
            fs.unlink(previousPhotoPath, (unlinkErr) => {
                if (unlinkErr) console.error(`Failed to delete old photo at ${previousPhotoPath}: ${unlinkErr.message}`);
            });
        }
    }

    static async updateUser(req, res, profileImageUrl) {
        try {
            const { username, email, nickname } = req.body;

            const updatedUserData = {
                username,
                email,
                nickname,
                profileImageUrl
            };

            const updateSuccess = await Users.updateUser(updatedUserData);
            validate(updateSuccess, 'Failed to update user', 500); // 업데이트 성공 여부 검사

            success(res, { profileImageUrl }, 'User updated successfully'); // 성공적인 응답 처리
        } catch (error) { next(error); }
    }
}

module.exports = UserController;

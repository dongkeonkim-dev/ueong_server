const Users = require('../models/users');
const { uploadFiles } = require('../middlewares/multer-middleware');
const fs = require('fs');
const path = require('path');
const { HttpError, check } = require('../utils/check')
const logger = require('../utils/logger')

class UserController {
    static async savePhotoAndUpdateUser(req, res, next) {
        if (req.is('multipart/form-data')) {
            await UserController.handleMultipartFormData(req, res, next);
        } else if (req.is('application/json')) {
            await UserController.handleJsonRequest(req, res, next);
        } else {
            throw new HttpError('Unsupported Content-Type', 400);
        }
    }

    static async handleMultipartFormData(req, res) {
        //멀터 미들웨어 사용
        uploadFiles(req, res, async (err) => {
            if (err) return next(new HttpError('File upload failed', 500)); // 간단한 에러 처리

            const user = await Users.getUserByUsername(req.body.username);
            check(user).isValid.assert('user')

            let profileImageUrl = user.profile_photo_url;

            if (req.uploadedFiles.images?.length) {
                profileImageUrl = `/uploads/images/${req.uploadedFiles.images[0]}`;
                await UserController.deleteOldPhoto(user.profile_photo_url);
            }

            await UserController.updateUser(req, res, profileImageUrl);
        });
    }

    static async handleJsonRequest(req, res) {
        const user = await Users.getUserByUsername(req.body.username);
        check(user).isValid.assert('user')

        await UserController.updateUser(req, res, user.profile_photo_url);
    }

    static async getUserByUsername(req, res) {
        const username = req.body.username || req.params.username;
        check(username).isValid.assert('username')

        const user = await Users.getUserByUsername(username);
        check(user).isValid.assert('user')

        return res.json(user);
    }

    static async deleteOldPhoto(profileImageUrl) {
        if (profileImageUrl) {
            const previousPhotoPath = path.join(__dirname, '..', profileImageUrl);
            fs.unlink(previousPhotoPath, (unlinkErr) => {
                if (unlinkErr) logger(`Failed to delete old photo at ${previousPhotoPath}: ${unlinkErr.message}`);
            });
        }
    }

    static async updateUser(req, res, profileImageUrl) {
        const { username, email, nickname } = req.body;

        const updatedUserData = {
            username,
            email,
            nickname,
            profileImageUrl,
        };

        const updateSuccess = await Users.updateUser(updatedUserData);
        check(updateSuccess).boolean.isTrue.assert('updateSuccess', 500);

        res.json({ success: true, data: updateSuccess });
    }
}

module.exports = UserController;

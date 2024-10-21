const UserRepository = require('../repositories/user-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const fs = require('fs');
const path = require('path');
const { HttpError, checkIf } = require('../utils/delete/checkIf')
const log = require('../utils/log')

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

            const user = await UserRepository.getUserByUsername(req.body.username);
            checkIf(user).isNotNil.elseThrow('user')

            let profileImageUrl = user.profile_photo_url;

            if (req.uploadedFiles.images?.length) {
                profileImageUrl = `/uploads/images/${req.uploadedFiles.images[0]}`;
                await UserController.deleteOldPhoto(user.profile_photo_url);
            }

            await UserController.updateUser(req, res, profileImageUrl);
        });
    }

    static async handleJsonRequest(req, res) {
        const user = await UserRepository.getUserByUsername(req.body.username);
        checkIf(user).isNotNil.elseThrow('user')

        await UserController.updateUser(req, res, user.profile_photo_url);
    }

    static async getUserByUsername(req, res) {
        const username = req.body.username || req.params.username;
        checkIf(username).isNotNil.elseThrow('username')

        const user = await UserRepository.getUserByUsername(username);
        checkIf(user).isNotNil.elseThrow('user')

        return res.json(user);
    }

    static async deleteOldPhoto(profileImageUrl) {
        if (profileImageUrl) {
            const previousPhotoPath = path.join(__dirname, '..', profileImageUrl);
            fs.unlink(previousPhotoPath, (unlinkErr) => {
                if (unlinkErr) log(`Failed to delete old photo at ${previousPhotoPath}: ${unlinkErr.message}`);
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

        const updateSuccess = await UserRepository.updateUser(updatedUserData);
        checkIf(updateSuccess).boolean.isTrue.elseThrow('updateSuccess', 500);

        res.json({ success: true, data: updateSuccess });
    }
}

module.exports = UserController;

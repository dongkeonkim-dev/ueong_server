const UserRepository = require('../repositories/user-repository');
const { uploadFiles } = require('../middlewares/multer-middleware');
const { HttpError } = require('../utils/custom-error')
const { User } = require('../utils/validation/schemas')
const { deleteFile } = require('../utils/file-manager');
const { IMAGE_PATH } = require('../config/constants');
const { partialExcept } = require('../utils/validation/utils');
const { log } = require('../utils/log');
const AuthService = require('../services/auth-service');


class UserController {
  static async updateUser(req, res, next) {
    if (req.is('multipart/form-data')) {
      await UserController.updateUserWithPhoto(req, res, next);
    } else if (req.is('application/json')) {
      await UserController.updateUserWithoutPhoto(req, res);
    } else {
      throw new HttpError('Unsupported Content-Type', 400);
    }
  }

  static async updateUserWithPhoto(req, res, next) {
    //멀터 미들웨어 사용
    uploadFiles(req, res, async (err) => {
      if (err) return next(new HttpError('File upload failed', 500));
      // 유저 정보 조회
      const input = partialExcept(User, { username: true }).parse(req.body);
      delete input.is_active;
      if (input.password == "") {
        delete input.password;
      } else {
        input.password = await AuthService.hashPassword(input.password);
      }
      const storedUser = await UserRepository.getUserByUsername(input.username);
      input.profile_photo_url = storedUser.profile_photo_url;
      // 이미지 업로드 시 기존 이미지 삭제
      if (req.uploadedFiles.image_names?.length) {
        deleteFile(storedUser.profile_photo_url);
        input.profile_photo_url = `${IMAGE_PATH}${req.uploadedFiles.image_names[0]}`;
      }
      // 유저 정보 업데이트
      const affectedRows = await UserRepository.updateUser(input);
      return res.json({ affectedRows });
    });
  }

  static async updateUserWithoutPhoto(req, res) {
    const input = partialExcept(User, { username: true })
      .omit({ profile_photo_url: true }).parse(req.body);
    delete input.is_active;
    if (input.password == "") {
      delete input.password;
    } else {
      input.password = await AuthService.hashPassword(input.password);
    }
    const affectedRows = await UserRepository.updateUser(input);
    return res.json({ affectedRows });
  }

  static async getUser(req, res) {
    const user = await UserRepository.getUserByUsername(req.user.username);
    return res.json(user);
  }

  static async getUserByUsername(req, res) {
    const input = User.pick({ username: true }).parse(req.params);
    const user = await UserRepository.getUserByUsername(input.username);
    return res.json(user);
  }

  static async deactivateUser(req, res) {
    log(User.pick({ is_active: true }).required().keyof());
    const input = User.pick({ is_active: true }).required().parse(req.body);
    input.username = req.user.username;
    const affectedRows = await UserRepository.updateUser(input);
    res.status(200).json({ affectedRows });
  }
}

module.exports = UserController;

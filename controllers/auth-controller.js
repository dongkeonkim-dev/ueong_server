//controllers/AuthController.js
const AuthService = require('../services/auth-service');
const AuthRepository = require('../repositories/auth-repository');
const { Natural } = require('../utils/validation/custom-zod-types');
const { User, omitUserId } = require('../utils/validation/schemas');
const config = require('../config');

class AuthController {
  static async signup(req, res) {
    const input = omitUserId(User).parse(req.body);
    input.password = await AuthService.hashPassword(input.password);
    let user_id = Natural.parse(await AuthRepository.signup(input));
    res.status(200).json({ isSuccess: true });
  }

  static async login(req, res) {
    const input = User.pick({username: true, password: true}).parse(req.body);
    const accessToken = await AuthService.generateToken(input);
    res.status(200).json({ accessToken });
  }

  static async validateToken(req, res) {
    const payload = AuthService.verifyJwt(req.headers[config.accessTokenHeader]);
    res.status(200).json({ isValid: true });
  }
}

module.exports = AuthController;


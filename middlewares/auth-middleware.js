const jwt = require('jsonwebtoken');
const config = require('../config');
const { UnauthorizedError } = require('../utils/custom-error');
const AuthService = require('../services/auth-service');
class AuthMiddleware {
  /**
   * 요청 헤더에서 JWT 토큰을 추출하고 검증합니다.
   * @param {Object} req - 요청 객체
   * @param {Object} res - 응답 객체
   * @param {Function} next - 다음 미들웨어로 넘어가기 위한 함수
   */
  static async authenticate(req, res, next) {
    const token = req.headers[config.accessTokenHeader]
    if (!token) {
      throw new UnauthorizedError(null, '토큰이 제공되지 않았습니다.');
    }
    const user = await AuthService.getUserFromToken(token); // 토큰 검증
    req.user = {
      username: user.username,
      authority: user.authority
    }
    next();
  }
}

module.exports = AuthMiddleware;

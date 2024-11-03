const AuthRepository = require('../repositories/auth-repository');
const UserRepository = require('../repositories/user-repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');
const { UnauthorizedError } = require('../utils/custom-error');
const { log } = require('../utils/log');

class AuthService {
  /**
   * 사용자 이름과 비밀번호를 바탕으로 JWT 토큰을 생성합니다.
   * @param {string} username - 사용자 이름
   * @param {string} password - 비밀번호
   * @returns {string} - JWT 토큰
   */
  static async generateToken(input) {
    const user = await UserRepository.getUserByUsername(input.username);
    if (!user) {
      throw new UnauthorizedError(null, '사용자를 찾을 수 없습니다.');
    }
    if (!user.is_active) {
      throw new UnauthorizedError(null, '탈퇴한 유저입니다.');
    }
    // 비밀번호 확인
    const match = await bcrypt.compare(input.password, user.password);
    if (match) {
      // 토큰 생성
      const jti = uuidv4();
      const token = jwt.sign(
        {
          iat: Math.floor(Date.now() / 1000),
        },
        config.secretKey,
        {
          algorithm: 'HS512',
          issuer: 'ueong_server',
          audience: 'ueong_client',
          expiresIn: '15m',
          notBefore: '0',
          subject: user.username,
          jwtid: jti
        }
      );
      return token;
    } else {
      throw new UnauthorizedError(null, '비밀번호가 일치하지 않습니다.');
    }
  }

  static async getUserFromToken(token) {
    try {
      const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
      const payload = jwt.verify(tokenString, config.secretKey);
      const user = await UserRepository.getUserByUsername(payload.sub);
      if (!user) {
        throw new UnauthorizedError(null, '사용자를 찾을 수 없습니다.');
      }
      if (!user.is_active) {
        throw new UnauthorizedError(null, '탈퇴한 유저입니다.');
      }
      return user;

    } catch (err) {
      // JWT 관련 오류 구분
      if (err instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError(err, '로그인 유효기간이 만료되었습니다.');
      }
      if (err instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError(err, '토큰이 유효하지 않습니다.');
      }
      if (err instanceof jwt.NotBeforeError) {
        throw new UnauthorizedError(err, '토큰이 아직 활성화되지 않았습니다.');
      }
      // 그 외 오류
      throw new UnauthorizedError(err, '토큰 인증에 실패했습니다.');
    }
  }

  static hashPassword(password) {
    return bcrypt.hash(password, config.bcryptSalt);
  }
}

module.exports = AuthService;

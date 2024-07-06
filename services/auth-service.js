//services/auth-service.js
const Auth = require('../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');

class AuthService {
    static async generateToken(username, password) {
        const auth = await Auth.getUserAuthByUsername(username);
        //비밀번호 확인
        const match = await bcrypt.compare(password, auth.password);
        if (match) {
            //token 생성
            const jti = uuidv4()
            const token = jwt.sign(
                { 
                    iat: Math.floor(Date.now() / 1000),
                    authority: auth.authority
                }, 
                config.secretKey, 
                { 
                    algorithm: 'HS512',
                    issuer: 'ueong_server',
                    audience: 'ueong_client',
                    expiresIn: '15m',
                    notBefore: '0',
                    subject: auth.user_id.toString(),
                    jwt_id: jti
                 });
            return token;
        } else {
            throw new Error('Incorrect password');
        }
    }

    static validateToken(token) {
        return jwt.verify(token, config.secretKey);
    }

    static async logout(req, res) {
        res.status(200).json({ message: 'Logout successful' });
    }
}

module.exports = AuthService;


//controllers/AuthController.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const AuthService = require('../services/auth-service');

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        try {
            const token = await AuthService.generateToken(username, password);
            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static validateToken(req, res) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                console.error("Token verification error: ", err);
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            console.log("Token verified successfully: ", decoded);
            res.status(200).json({ username: decoded.username, authority: decoded.authority });
        });
    }

    static logout(req, res) {
        UserService.logout(req, res);
    }
}

module.exports = AuthController;


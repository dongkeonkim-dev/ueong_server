// Server/middlewares/auth-middleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthMiddleware {
    static authenticate(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                console.error("Token verification error in middleware: ", err);
                return res.status(401).json({ message: 'Failed to authenticate token' });
            }
            req.user = decoded;
            next();
        });
    }
}

module.exports = AuthMiddleware;

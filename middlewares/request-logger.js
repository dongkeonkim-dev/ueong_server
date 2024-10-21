// middlewares/request-logger.js

const ENABLE_REQUEST_LOGGING = process.env.ENABLE_LOGGING === 'true';
const ENABLE_REQUEST_BODY_LOGGING = process.env.ENABLE_REQUEST_BODY_LOGGING === 'true';
const log = require('../utils/log'); // 실제 로그 유틸리티 경로로 수정하세요

// 요청 로깅 미들웨어
const requestLogger = (req, res, next) => {
    if (ENABLE_REQUEST_LOGGING) {
        const { method, url } = req;
        log(`[요청] ${method} ${url}`, '정보');

        if (ENABLE_REQUEST_BODY_LOGGING) {
            if (Object.keys(req.query).length > 0) {
                log(`[query]: ${JSON.stringify(req.query)}`, '정보');
            }
            if (Object.keys(req.body).length > 0) {
                log(`[body]: ${JSON.stringify(req.body)}`, '정보');
            }
        }
    }
    next();
};

module.exports = requestLogger;

// middlewares/request-logger.js
const { log } = require('../utils/log'); // 실제 로그 유틸리티 경로로 수정하세요

const requestLogger = (req, res, next) => {
    const ENABLE_REQUEST_LOGGING =
        process.env.ENABLE_LOGGING === 'true' &&
        process.env.ENABLE_REQUEST_LOGGING === 'true';

    if (ENABLE_REQUEST_LOGGING) {
        log(req); // 요청 객체 로깅
    }
    next();
};

module.exports = requestLogger;

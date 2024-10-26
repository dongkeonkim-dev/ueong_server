// middlewares/response-logger.js

const { logResponse } = require('../utils/log');

const responseLogger = (req, res, next) => {
    const ENABLE_RESPONSE_LOGGING =
        process.env.ENABLE_LOGGING === 'true' &&
        process.env.ENABLE_RESPONSE_LOGGING === 'true';

    if (ENABLE_RESPONSE_LOGGING) {
        logResponse(res, 'detailed'); // 기본 모드로 응답 로깅
    }
    next();
};

module.exports = responseLogger;

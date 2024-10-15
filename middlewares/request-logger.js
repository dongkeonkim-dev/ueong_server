// requestLogger.js

const ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true';

// 요청 로깅 미들웨어
const requestLogger = (req, res, next) => {
    if (ENABLE_LOGGING) {
        console.log(`[요청] ${req.method} ${req.url} - ${new Date().toISOString()}`);
    }
    next();
};

module.exports = requestLogger;
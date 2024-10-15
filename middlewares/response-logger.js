// responseLogger.js

const ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true';

// 응답 및 에러 로깅 미들웨어
const responseLogger = (req, res, next) => {
    const originalSend = res.send;

    res.send = function (body) {
        if (ENABLE_LOGGING) {
            console.log(`[응답] ${res.statusCode} - ${new Date().toISOString()}`);
            console.log('응답 내용:', body);
        }
        return originalSend.apply(this, arguments);
    };

    res.on('finish', () => {
        if (res.statusCode >= 400 && ENABLE_LOGGING) {
            console.error(`[오류] 상태 코드: ${res.statusCode} - ${req.method} ${req.url}`);
        }
    });

    next();
};

module.exports = responseLogger;

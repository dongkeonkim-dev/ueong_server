// utils/logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

// 커스텀 로그 포맷 정의
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// 로거 생성
const logger = createLogger({
    level: 'info', // 최소 로그 레벨 설정 (error, warn, info, verbose, debug, silly)
    format: combine(
        colorize(), // 로그 레벨 색상화
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 타임스탬프 추가
        myFormat // 커스텀 포맷 적용
    ),
    transports: [
        new transports.Console(), // 콘솔 출력
        // 필요시 파일 로깅 추가
        // new transports.File({ filename: 'combined.log' })
    ],
});

module.exports = logger;

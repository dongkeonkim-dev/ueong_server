// utils/log.js
require('dotenv').config();

/**
 * Logs messages to the console if ENABLE_LOGGING is true.
 * @param {string} message - The message to log.
 * @param {string} level - The level of the log ('info', 'error', etc.).
 */
const log = (message, level = '정보') => {
    if (process.env.ENABLE_LOGGING === 'true') {
        const timestamp = new Date().toISOString();
        switch (level) {
            case '에러':
                console.error(`[에러] - ${timestamp}: ${String(message)}`);
                break;
            case '경고':
                console.warn(`[경고] - ${timestamp}: ${String(message)}`);
                break;
            case '정보':
            default:
                console.log(`[정보] - ${timestamp}: ${String(message)}`);
                break;
        }
    }
};

module.exports = log;
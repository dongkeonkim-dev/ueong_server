// utils/log.js

// Load environment variables (ensure this is done before using the log)
require('dotenv').config();

/**
 * Logs messages to the console if ENABLE_LOGGING is true.
 * @param {string} message - The message to log.
 * @param {string} level - The level of the log ('info', 'error', etc.).
 */
const log = (message, level = 'info') => {
    if (process.env.ENABLE_LOGGING === 'true') {
        const timestamp = new Date().toISOString();
        switch (level) {
            case 'error':
                console.error(`[${timestamp}] [ERROR]: ${message}`);
                break;
            case 'warn':
                console.warn(`[${timestamp}] [WARN]: ${message}`);
                break;
            case 'info':
            default:
                console.log(`[${timestamp}] [INFO]: ${message}`);
                break;
        }
    }
};

module.exports = log;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logError = exports.logWarn = exports.logInfo = exports.logDebug = void 0;
const initLevels = () => {
    if (process.env.LOG_LEVEL)
        return process.env.LOG_LEVEL;
    return process.env.NODE_ENV === 'development' ? 'info' : 'error';
};
const level = initLevels();
/**
 * Log a debug message when debug level or above is enabled
 * @param msg message
 * @param data data
 */
const logDebug = (msg, ...data) => {
    // eslint-disable-next-line no-console
    if (level === 'debug')
        console.debug(msg, data);
};
exports.logDebug = logDebug;
/**
 * Log an info message when info level or above is enabled
 * @param msg message
 * @param data data
 */
const logInfo = (msg, ...data) => {
    // eslint-disable-next-line no-console
    if (['debug', 'info'].includes(level))
        console.info(msg, data);
};
exports.logInfo = logInfo;
/**
 * Log a warn message when warn level or above is enabled
 * @param msg message
 * @param data data
 */
const logWarn = (msg, ...data) => {
    if (['debug', 'info', 'warn'].includes(level))
        console.warn(msg, data);
};
exports.logWarn = logWarn;
/**
 * Log an error message when error level is enabled
 * @param msg message
 * @param data data
 */
const logError = (msg, ...data) => {
    if (['debug', 'info', 'warn', 'error'].includes(level))
        console.error(msg, data);
};
exports.logError = logError;
exports.log = exports.logInfo;
//# sourceMappingURL=log-util.js.map
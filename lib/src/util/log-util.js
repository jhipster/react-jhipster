"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logError = exports.logWarn = exports.logInfo = exports.logDebug = void 0;
var initLevels = function () {
    if (process.env.LOG_LEVEL)
        return process.env.LOG_LEVEL;
    return process.env.NODE_ENV === 'development' ? 'info' : 'error';
};
var level = initLevels();
/**
 * Log a debug message when debug level or above is enabled
 * @param msg message
 * @param data data
 */
var logDebug = function (msg) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
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
var logInfo = function (msg) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
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
var logWarn = function (msg) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    if (['debug', 'info', 'warn'].includes(level))
        console.warn(msg, data);
};
exports.logWarn = logWarn;
/**
 * Log an error message when error level is enabled
 * @param msg message
 * @param data data
 */
var logError = function (msg) {
    var data = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
    }
    if (['debug', 'info', 'warn', 'error'].includes(level))
        console.error(msg, data);
};
exports.logError = logError;
exports.log = exports.logInfo;
//# sourceMappingURL=log-util.js.map
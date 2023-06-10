export declare type LogLevelType = 'info' | 'error' | 'warn' | 'debug' | 'off';
/**
 * Log a debug message when debug level or above is enabled
 * @param msg message
 * @param data data
 */
export declare const logDebug: (msg: any, ...data: any[]) => void;
/**
 * Log an info message when info level or above is enabled
 * @param msg message
 * @param data data
 */
export declare const logInfo: (msg: any, ...data: any[]) => void;
/**
 * Log a warn message when warn level or above is enabled
 * @param msg message
 * @param data data
 */
export declare const logWarn: (msg: any, ...data: any[]) => void;
/**
 * Log an error message when error level is enabled
 * @param msg message
 * @param data data
 */
export declare const logError: (msg: any, ...data: any[]) => void;
export declare const log: (msg: any, ...data: any[]) => void;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPromise = void 0;
/**
 * Check if the passed object is a promise
 * @param value the object to check
 */
const isPromise = (value) => {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
};
exports.isPromise = isPromise;
//# sourceMappingURL=promise-utils.js.map
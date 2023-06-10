"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isEmpty = exports.nanToZero = void 0;
const nanToZero = (input) => (isNaN(input) ? 0 : input);
exports.nanToZero = nanToZero;
function isEmpty(value) {
    return (typeof value === 'undefined' ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        value === false ||
        (Array.isArray(value) && value.length === 0));
}
exports.isEmpty = isEmpty;
function isNumber(value) {
    if (isEmpty(value))
        return true;
    if ((typeof value === 'boolean' && value === true) || (Array.isArray(value) && value.length !== 0)) {
        return false;
    }
    value = Number(value);
    return typeof value === 'number' && !isNaN(value);
}
exports.isNumber = isNumber;
//# sourceMappingURL=number-utils.js.map
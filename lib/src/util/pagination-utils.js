"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
exports.loadMoreDataWhenScrolled = function (currentData, incomingData, links) {
    if (links.first === links.last || !currentData.length) {
        return incomingData;
    }
    if (currentData.length >= incomingData.length) {
        return currentData.concat(incomingData);
    }
    return null;
};
//# sourceMappingURL=pagination-utils.js.map
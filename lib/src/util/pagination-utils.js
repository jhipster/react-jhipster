"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
exports.loadMoreDataWhenScrolled = function (currentData, incomingData, links) {
    var data = null;
    if (links.first === links.last && incomingData.length) {
        data = incomingData;
    }
    else {
        if (currentData.length === incomingData.length) {
            if (links.prev === undefined) {
                data = incomingData;
            }
            else if (!lodash_1.isEqual(currentData, incomingData)) {
                data = currentData.concat(incomingData);
            }
        }
        else {
            data = currentData.concat(incomingData);
        }
    }
    return data;
};
//# sourceMappingURL=pagination-utils.js.map
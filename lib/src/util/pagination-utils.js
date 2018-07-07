"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual = require("lodash.isequal");
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
exports.loadMoreDataWhenScrolled = function (currentData, incomingData, links, itemsPerPage) {
    var data = null;
    if (links.first === links.last) {
        data = incomingData;
    }
    else {
        if (incomingData.length === currentData.length) {
            if (links.prev === undefined) {
                data = incomingData;
            }
            else if (!isEqual(currentData, incomingData)) {
                data = currentData.concat(incomingData);
            }
        }
        else {
            if (incomingData.length === itemsPerPage) {
                data = incomingData;
            }
            else {
                data = currentData.concat(incomingData);
            }
        }
    }
    return data;
};
//# sourceMappingURL=pagination-utils.js.map
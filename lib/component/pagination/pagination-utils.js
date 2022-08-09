"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMoreDataWhenScrolled = exports.getPaginationState = void 0;
const url_utils_1 = require("../../util/url-utils");
const getPaginationState = (location, itemsPerPage) => {
    const pageParam = (0, url_utils_1.getUrlParameter)('page', location.search);
    let activePage = 1;
    if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
        activePage = parseInt(pageParam, 10);
    }
    return { itemsPerPage, activePage };
};
exports.getPaginationState = getPaginationState;
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
const loadMoreDataWhenScrolled = (currentData, incomingData, links) => {
    if (links.first === links.last || !currentData.length) {
        return incomingData;
    }
    if (currentData.length >= incomingData.length) {
        return [...currentData, ...incomingData];
    }
    return null;
};
exports.loadMoreDataWhenScrolled = loadMoreDataWhenScrolled;
//# sourceMappingURL=pagination-utils.js.map
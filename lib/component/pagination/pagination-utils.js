"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMoreDataWhenScrolled = exports.getPaginationState = exports.getSortState = void 0;
const url_utils_1 = require("../../util/url-utils");
const getSortState = (location, sortField = 'id', sortOrder = 'asc') => {
    const sortParam = (0, url_utils_1.getUrlParameter)('sort', location.search);
    let sort = sortField;
    let order = sortOrder;
    if (sortParam !== '') {
        sort = sortParam.split(',')[0];
        order = sortParam.split(',')[1];
    }
    return { sort, order };
};
exports.getSortState = getSortState;
const getPaginationState = (location, itemsPerPage, sortField = 'id', sortOrder = 'asc') => {
    const pageParam = (0, url_utils_1.getUrlParameter)('page', location.search);
    let activePage = 1;
    if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
        activePage = parseInt(pageParam, 10);
    }
    const { sort, order } = (0, exports.getSortState)(location, sortField, sortOrder);
    return { itemsPerPage, sort, order, activePage };
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
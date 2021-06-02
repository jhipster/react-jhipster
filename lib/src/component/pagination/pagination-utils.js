"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMoreDataWhenScrolled = exports.getSortState = void 0;
var url_utils_1 = require("../../util/url-utils");
var getSortState = function (location, itemsPerPage, idField) {
    var pageParam = url_utils_1.getUrlParameter('page', location.search);
    var sortParam = url_utils_1.getUrlParameter('sort', location.search);
    var sort = idField || 'id';
    var order = 'asc';
    var activePage = 1;
    if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
        activePage = parseInt(pageParam, 10);
    }
    if (sortParam !== '') {
        sort = sortParam.split(',')[0];
        order = sortParam.split(',')[1];
    }
    return { itemsPerPage: itemsPerPage, sort: sort, order: order, activePage: activePage };
};
exports.getSortState = getSortState;
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
var loadMoreDataWhenScrolled = function (currentData, incomingData, links) {
    if (links.first === links.last || !currentData.length) {
        return incomingData;
    }
    if (currentData.length >= incomingData.length) {
        return __spreadArray(__spreadArray([], currentData), incomingData);
    }
    return null;
};
exports.loadMoreDataWhenScrolled = loadMoreDataWhenScrolled;
//# sourceMappingURL=pagination-utils.js.map
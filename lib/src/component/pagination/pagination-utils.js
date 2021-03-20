"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortState = void 0;
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
//# sourceMappingURL=pagination-utils.js.map
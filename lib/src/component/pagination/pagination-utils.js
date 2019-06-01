"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_utils_1 = require("../../util/url-utils");
exports.getSortState = function (location, itemsPerPage) {
    var pageParam = url_utils_1.getUrlParameter('page', location.search);
    var sortParam = url_utils_1.getUrlParameter('sort', location.search);
    var sort = 'id';
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
//# sourceMappingURL=pagination-utils.js.map
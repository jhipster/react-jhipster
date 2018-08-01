"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get base path from current window location
 */
exports.getBasePath = function () { return window.location.href.split('#')[0]; };
/**
 * Parse the header link element and return all links inside.
 * @param header header of link
 */
exports.parseHeaderForLinks = function (header) {
    if (header.length === 0) {
        throw new Error('input must not be of zero length');
    }
    // Split parts by comma
    var parts = header.split(',');
    var links = {};
    // Parse each part into a named link
    parts.forEach(function (p) {
        var section = p.split(';');
        if (section.length !== 2) {
            throw new Error('section could not be split on ";"');
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var queryString = {};
        url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function ($0, $1, $2, $3) { return (queryString[$1] = $3); });
        var page = queryString.page;
        if (typeof page === 'string') {
            page = parseInt(page, 10);
        }
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = page;
    });
    return links;
};
/**
 * Fetch an entry from URL params
 * @param name the param name to fetch
 * @param search the search part from react router location
 */
exports.getUrlParameter = function (name, search) {
    var url = new URL("http://localhost" + search); // using a dummy url for parsing
    return url.searchParams.get(name) || '';
};
//# sourceMappingURL=url-utils.js.map
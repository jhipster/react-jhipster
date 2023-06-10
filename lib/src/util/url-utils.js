"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlParameter = exports.parseHeaderForLinks = exports.getBasePath = void 0;
/**
 * Get base path from current window location
 */
const getBasePath = () => window.location.href.split('#')[0];
exports.getBasePath = getBasePath;
/**
 * Parse the header link element and return all links inside.
 * @param header header of link
 */
const parseHeaderForLinks = (header) => {
    if (header.length === 0) {
        throw new Error('input must not be of zero length');
    }
    // Split parts by comma
    const parts = header.split(',');
    const links = {};
    // Parse each part into a named link
    parts.forEach(p => {
        const section = p.split(';');
        if (section.length !== 2) {
            throw new Error('section could not be split on ";"');
        }
        const url = section[0].replace(/<(.*)>/, '$1').trim();
        const queryString = {};
        url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => (queryString[$1] = $3));
        let page = queryString.page;
        if (typeof page === 'string') {
            page = parseInt(page, 10);
        }
        const name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = page;
    });
    return links;
};
exports.parseHeaderForLinks = parseHeaderForLinks;
/**
 * Fetch an entry from URL params
 * @param name the param name to fetch
 * @param search the search part from react router location
 */
const getUrlParameter = (name, search) => {
    const url = new URL(`http://localhost${search}`); // using a dummy url for parsing
    return url.searchParams.get(name) || '';
};
exports.getUrlParameter = getUrlParameter;
//# sourceMappingURL=url-utils.js.map
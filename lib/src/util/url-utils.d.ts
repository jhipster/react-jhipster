/**
 * Get base path from current window location
 */
export declare const getBasePath: () => string;
/**
 * Parse the header link element and return all links inside.
 * @param header header of link
 */
export declare const parseHeaderForLinks: (header: string) => any;
/**
 * Fetch an entry from URL params
 * @param name the param name to fetch
 * @param search the search part from react router location
 */
export declare const getUrlParameter: (name: string, search: string) => string;

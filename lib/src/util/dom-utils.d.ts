/**
 * Fetch the specified element by id or return default
 * @param id id of element
 */
export declare const containerSize: (id?: string) => HTMLElement | {
    offsetHeight: number;
    offsetWidth: number;
};
/**
 * Fetch the current window size
 */
export declare const windowSize: () => {
    width: number;
    height: number;
};
/**
 * Get the current browser locale
 */
export declare const browserLocale: () => string;

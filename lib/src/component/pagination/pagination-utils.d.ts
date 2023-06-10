export interface ISortBaseState {
    sort: string;
    order: string;
}
export interface IPaginationBaseState extends ISortBaseState {
    itemsPerPage: number;
    activePage: number;
}
export declare const getSortState: (location: {
    search: string;
}, sortField?: string, sortOrder?: string) => ISortBaseState;
export declare const getPaginationState: (location: {
    search: string;
}, itemsPerPage: number, sortField?: string, sortOrder?: string) => IPaginationBaseState;
/**
 * Retrieve new data when infinite scrolling
 * @param currentData
 * @param incomingData
 * @param links
 */
export declare const loadMoreDataWhenScrolled: (currentData: any, incomingData: any, links: any) => any;

import React from 'react';
export interface IJhiPaginationProps {
    activePage: number;
    onSelect: (page: number) => void;
    maxButtons: number;
    totalItems: number;
    itemsPerPage: number;
}
export interface IJhiPaginationState {
    currentPage: number;
}
export declare class JhiPagination extends React.Component<IJhiPaginationProps, IJhiPaginationState> {
    constructor(props: any);
    updateActivePage: (currentPage: any) => () => void;
    previousPage: () => void;
    nextPage: () => void;
    itemsToDisplay: (activePage: any) => any[];
    displayPaginationItem: (i: any, activePage: any) => JSX.Element;
    cleanActivePage: () => void;
    getMaxPage: () => number;
    render(): JSX.Element;
}

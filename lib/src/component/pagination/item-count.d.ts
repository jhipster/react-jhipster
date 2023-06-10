import React from 'react';
export interface IJhiItemCountProps {
    page: number;
    total: number;
    itemsPerPage: number;
    i18nEnabled?: boolean;
}
export declare class JhiItemCount extends React.Component<IJhiItemCountProps> {
    constructor(props: any);
    i18nValues(): {
        first: number;
        second: number;
        total: number;
    };
    render(): JSX.Element;
}

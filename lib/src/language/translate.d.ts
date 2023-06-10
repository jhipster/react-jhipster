import React from 'react';
export interface ITranslateProps {
    contentKey: string;
    children?: string | JSX.Element | Array<string | JSX.Element>;
    interpolate?: any;
    component?: string;
}
/**
 * Translates the given key using provided i18n values
 */
declare class Translate extends React.Component<ITranslateProps> {
    static defaultProps: {
        component: string;
    };
    constructor(props: any);
    componentDidUpdate(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    render(): any[] | React.DOMElement<null, Element>;
}
export declare const translate: (contentKey: string, interpolate?: any, children?: string) => any;
export default Translate;

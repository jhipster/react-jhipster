import React from 'react';
export interface IHttpRequestMetricsProps {
    requestMetrics: any;
    wholeNumberFormat: string;
    twoDigitAfterPointFormat: string;
}
export declare class HttpRequestMetrics extends React.Component<IHttpRequestMetricsProps> {
    render(): JSX.Element;
}

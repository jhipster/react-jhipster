import React from 'react';
export interface ISystemMetricsProps {
    systemMetrics: any;
    wholeNumberFormat: string;
    timestampFormat: string;
}
export declare class SystemMetrics extends React.Component<ISystemMetricsProps> {
    static convertMillisecondsToDuration(ms: any): string;
    render(): JSX.Element;
}

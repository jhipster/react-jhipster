import React from 'react';
export interface IGarbageCollectorMetricsProps {
    garbageCollectorMetrics: any;
    wholeNumberFormat: string;
}
export declare class GarbageCollectorMetrics extends React.Component<IGarbageCollectorMetricsProps> {
    render(): JSX.Element;
}

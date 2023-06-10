import React from 'react';
export interface IJvmMemoryProps {
    jvmMetrics: any;
    wholeNumberFormat: string;
}
export declare class JvmMemory extends React.Component<IJvmMemoryProps> {
    render(): JSX.Element;
}

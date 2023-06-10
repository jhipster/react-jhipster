import React from 'react';
export interface IJvmThreadsProps {
    jvmThreads: any;
    wholeNumberFormat: string;
}
export interface IJvmThreadsState {
    showModal: boolean;
    threadStats: {
        threadDumpAll: number;
        threadDumpRunnable: number;
        threadDumpTimedWaiting: number;
        threadDumpWaiting: number;
        threadDumpBlocked: number;
    };
}
export declare class JvmThreads extends React.Component<IJvmThreadsProps, IJvmThreadsState> {
    state: IJvmThreadsState;
    countThreadByState(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    openModal: () => void;
    handleClose: (e: any) => void;
    renderModal: () => JSX.Element;
    render(): JSX.Element;
}

import React from 'react';
export interface IThreadsModalProps {
    showModal: boolean;
    handleClose: (e: any) => void;
    threadDump: any;
}
export interface IThreadsModalState {
    badgeFilter: string;
    searchFilter: string;
}
export declare class ThreadsModal extends React.Component<IThreadsModalProps, IThreadsModalState> {
    state: IThreadsModalState;
    computeFilteredList: () => any;
    computeCounters: () => {
        threadDumpAll: number;
        threadDumpRunnable: number;
        threadDumpWaiting: number;
        threadDumpTimedWaiting: number;
        threadDumpBlocked: number;
    };
    getBadgeClass: (threadState: any) => "badge-success" | "badge-info" | "badge-warning" | "badge-danger";
    updateBadgeFilter: (badge: any) => () => void;
    updateSearchFilter: (event: any) => void;
    render(): JSX.Element;
}
export default ThreadsModal;

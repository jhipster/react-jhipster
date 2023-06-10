import React from 'react';
export interface IThreadItemProps {
    threadDumpInfo: any;
}
export interface IThreadItemState {
    collapse: boolean;
}
export declare class ThreadItem extends React.Component<IThreadItemProps, IThreadItemState> {
    state: IThreadItemState;
    toggleStackTrace: () => void;
    render(): JSX.Element;
}
export default ThreadItem;

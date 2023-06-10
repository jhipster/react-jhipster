import React from 'react';
export declare const openFile: (contentType: string, data: string) => () => void;
export declare const size: (value: string) => number;
export declare const byteSize: (base64String: string) => string;
export declare const setFileData: (event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>, callback: (type: any, v: string) => void, isImage: boolean) => void;

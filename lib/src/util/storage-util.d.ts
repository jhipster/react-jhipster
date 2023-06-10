export declare const enum StorageType {
    SESSION = 0,
    LOCAL = 1
}
/**
 * Get either localStorage or sessionStorage
 * @param type storage type
 */
export declare const getStorage: (type: StorageType) => Storage;
export declare type getItemType = (key: string, defaultVal?: any) => any;
export declare type setItemType = (key: string, value: any) => void;
export declare type removeItemType = (key: string) => void;
export interface IStorageAPI {
    get: getItemType;
    set: setItemType;
    remove: removeItemType;
}
export interface IStorageService {
    session: IStorageAPI;
    local: IStorageAPI;
}
export declare const Storage: IStorageService;

import { AxiosPromise } from 'axios';
export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = (dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>;
export declare type ICrudGetAction<T> = (id: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = (page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudSearchAction<T> = (search?: string, page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T> = (data?: T) => IPayload<T> | IPayloadResult<T>;
export declare type ICrudDeleteAction<T> = (id?: string | number) => IPayload<T> | IPayloadResult<T>;

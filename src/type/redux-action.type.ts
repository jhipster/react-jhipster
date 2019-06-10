import { AxiosPromise } from 'axios';

export interface IPayload<T> {
  type: string;
  payload: AxiosPromise<T>;
  meta?: any;
}
export type IPayloadResult<T> = ((dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>);
export type ICrudGetAction<T> = (id: string | number) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export type ICrudGetAllAction<T> = (page?: number, size?: number, sort?: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export type ICrudSearchAction<T> = (
  search?: string,
  page?: number,
  size?: number,
  sort?: string
) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export type ICrudPutAction<T> = (data?: T) => IPayload<T> | IPayloadResult<T>;
export type ICrudDeleteAction<T> = (id?: string | number) => IPayload<T> | IPayloadResult<T>;

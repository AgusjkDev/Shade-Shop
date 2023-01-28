import { StatusCode } from "enums/api";

export interface APIError {
    msg: string;
    status: StatusCode;
}

export interface GetCategories extends APIResponse {
    categories: Category[];
    status: StatusCode.OK;
}

export interface GetProducts extends APIResponse {
    products: Product[];
    status: StatusCode.OK;
}

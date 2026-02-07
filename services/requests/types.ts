
export enum EbaseUrls {
    ISHANGO_BE = "http://localhost:3001/api/v1",
}

export interface RequestParams {
    path: string;
    auth: boolean;
    headers: {
        [key: string]: string;
    }
    data?: any;
    timeout?: number;
}

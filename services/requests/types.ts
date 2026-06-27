
export enum EbaseUrls {
    ISHANGO_BE = "https://api.ishango-engine.com/api/v1",
    // ISHANGO_BE = "http://localhost:3001/api/v1",
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

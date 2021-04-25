import {AxiosRequestConfig, AxiosResponse, AxiosStatic} from "axios";

export type QueryParamsType = Record<string, string> | null;

export class Repository {
    constructor(
        private readonly apiUrl: string,
        private readonly axios: AxiosStatic
    ) {
    }

    private static handleResponse<ReturnType>(rawResponse: AxiosResponse, resolve: (value: ReturnType | PromiseLike<ReturnType>) => void, reject: (reason?: any) => void) {
        const status = rawResponse.status;

        if (status >= 200 && status < 300) {
            resolve(rawResponse.data);
        } else {
            reject(rawResponse);
        }
    }

    protected get<ReturnType>(path: string, query?: QueryParamsType, axiosOptions?: AxiosRequestConfig): Promise<ReturnType> {

        const url = this.buildUrl(path, query);

        return new Promise((resolve, reject) => {
            this.axios
                .get<ReturnType>(`${url}`, this.buildAxiosOptions(axiosOptions))
                .then(rawResponse => {
                    Repository.handleResponse<ReturnType>(rawResponse, resolve, reject)
                })
                .catch(e => reject(e));
        });
    };

    protected post<PayloadType, ReturnType>(path: string, query?: QueryParamsType, payload: PayloadType | null = null, axiosOptions?: AxiosRequestConfig): Promise<ReturnType> {
        return new Promise((resolve, reject) => {
            this.axios
                .post<ReturnType>(`${this.apiUrl}${path}`, payload, this.buildAxiosOptions(axiosOptions))
                .then(rawResponse => {
                    Repository.handleResponse<ReturnType>(rawResponse, resolve, reject)
                })
                .catch(e => reject(e));
        });
    };

    private buildUrl(path: string, query?: QueryParamsType): URL {
        const url = new URL(`${this.apiUrl}${path}`);

        if (query) {
            for (const [name, value] of Object.entries(query)) {
                url.searchParams.append(name, value);
            }
        }

        url.search = decodeURIComponent(url.search);

        return url
    }

    private buildAxiosOptions = (options?: AxiosRequestConfig): AxiosRequestConfig => {
        const defaultOptions: AxiosRequestConfig = {};

        if (options) {
            return {...defaultOptions, ...options};
        }
        return defaultOptions
    }
}

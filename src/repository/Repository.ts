import {AxiosResponse, AxiosStatic} from "axios";

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

    protected get<ReturnType>(url: string): Promise<ReturnType> {
        return new Promise((resolve, reject) => {
            this.axios
                .get<ReturnType>(`${this.apiUrl}${url}`)
                .then(rawResponse => {
                    Repository.handleResponse<ReturnType>(rawResponse, resolve, reject)
                })
                .catch(e => reject(e));
        });
    };

    protected post<PayloadType, ReturnType>(url: string, payload: PayloadType): Promise<ReturnType> {
        return new Promise((resolve, reject) => {
            this.axios
                .post<ReturnType>(`${this.apiUrl}${url}`, payload)
                .then(rawResponse => {
                    Repository.handleResponse<ReturnType>(rawResponse, resolve, reject)
                })
                .catch(e => reject(e));
        });
    };
}

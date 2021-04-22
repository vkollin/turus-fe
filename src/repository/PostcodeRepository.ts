import {QueryParamsType, Repository} from "./Repository";
import {Postcode} from "../model/Postcode";
import {PostcodeSearchResponse} from "../type/api/postcode";
import {createPostcodeFromPostcodeSearchResponse} from "../factory/postcode";
import {AxiosRequestConfig} from "axios";

export interface SearchOptions {
    withResult?: boolean, // default false
}

export class PostcodeRepository extends Repository {

    search = (value: string, options: SearchOptions, axiosOptions?: AxiosRequestConfig): Promise<Postcode[]> => {
        const url = `/api/postcode/search/${value}`;

        const query: QueryParamsType = {};

        const searchOptions: SearchOptions = {
            withResult: false,
            ...options,
        }

        if (searchOptions.withResult) {
            query.withResults = ''
        }

        return new Promise<Postcode[]>(((resolve, reject) => {
            this
                .get<PostcodeSearchResponse[]>(url, query, axiosOptions)
                .then(response => {
                    resolve(response.map(r => createPostcodeFromPostcodeSearchResponse(r)))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

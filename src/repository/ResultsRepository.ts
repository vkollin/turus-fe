import {QueryParamsType, Repository} from "./Repository";
import {GetDataResponse} from "../type/api/map";
import {Club} from "../model/Club";
import {AxiosRequestConfig} from "axios";
import {ResultsResponse} from "../model/ResultsResponse";
import {createFromResponse} from "../factory/results";

export class ResultsRepository extends Repository {

    getResults = (postcode: string | null, club: Club | null, axiosOptions?: AxiosRequestConfig) => {
        let url = `/api/results/`;
        const query: QueryParamsType = {};

        if (club) {
            query['club'] = `${club.id}`;
        }

        if (postcode) {
            query['postcode'] = `${postcode}`;
        }

        return new Promise<ResultsResponse>(((resolve, reject) => {
            this
                .get<GetDataResponse>(url, query, axiosOptions)
                .then(response => {
                    const results = response.shapes.map(s => createFromResponse(s));

                    resolve(new ResultsResponse(results))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

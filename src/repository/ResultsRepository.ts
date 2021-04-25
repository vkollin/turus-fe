import {QueryParamsType, Repository} from "./Repository";
import {GetDataResponse} from "../type/api/map";
import {Club} from "../model/Club";
import {AxiosRequestConfig} from "axios";
import {ClubAndPostcodeResponse, ResultsResponse} from "../model/ResultsResponse";
import {createFromResponse} from "../factory/results";
import {Postcode} from "../model/Postcode";
import {GetClubAndPostcodeResponse} from "../type/api/results";
import {createClubFromClubResponse} from "../factory/club";
import {createPostcodeFromPostcodeSearchResponse} from "../factory/postcode";

export class ResultsRepository extends Repository {

    getResults = (postcode: Postcode | null, club: Club | null, axiosOptions?: AxiosRequestConfig) => {
        let url = `/api/results/`;
        const query: QueryParamsType = {};

        if (club) {
            query['club'] = `${club.id}`;
        }

        if (postcode) {
            query['postcode'] = `${postcode.code}`;
        }

        return new Promise<ResultsResponse>(((resolve, reject) => {
            this
                .post<null, GetDataResponse>(url, query, null, axiosOptions)
                .then(response => {
                    const results = response.shapes.map(s => createFromResponse(s));

                    resolve(new ResultsResponse(results))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }

    getClubAndPostcode = (club: string | null, postcode: string | null, axiosOptions?: AxiosRequestConfig) => {
        let url = `/api/results/clubpostcode`;
        const query: QueryParamsType = {};

        if (club) {
            query['club'] = `${club}`;
        }

        if (postcode) {
            query['postcode'] = `${postcode}`;
        }

        return new Promise<ClubAndPostcodeResponse>(((resolve, reject) => {
            this
                .post<null, GetClubAndPostcodeResponse>(url, query, null, axiosOptions)
                .then(response => {
                    resolve(new ClubAndPostcodeResponse(
                        response.club ? createClubFromClubResponse(response.club) : null,
                        response.postcode ? createPostcodeFromPostcodeSearchResponse(response.postcode) : null
                    ))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

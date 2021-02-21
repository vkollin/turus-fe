import {QueryParamsType, Repository} from "./Repository";
import {Club} from "../model/Club";
import {ClubSearchResponse} from "../type/api/club";
import {createClubFromClubResponse} from "../factory/club";

export class ClubRepository extends Repository {

    search = (value: string, exclude: Club[] = []): Promise<Club[]> => {
        const url = `/api/club/search/${encodeURIComponent(value)}`;
        const query: QueryParamsType = {};

        const excludeParam = exclude.map(c => c.id).join(',');

        if (excludeParam.length) {
            query.exclude = excludeParam;
        }

        return new Promise<Club[]>(((resolve, reject) => {
            this
                .get<ClubSearchResponse>(url, query)
                .then(response => {
                    resolve(response.map(r => createClubFromClubResponse(r)))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

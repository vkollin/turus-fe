import {Repository} from "./Repository";
import {Club} from "../model/Club";
import {ClubSearchResponse} from "../type/api/club";
import {createClubFromClubResponse} from "../factory/club";

export class ClubRepository extends Repository {

    search = (value: string, exclude: Club[] = []): Promise<Club[]> => {
        const url = `/api/club/search/${value}?exclude=${exclude.map(c => c.id).join(',')}`;

        return new Promise<Club[]>(((resolve, reject) => {
            this
                .get<ClubSearchResponse>(url)
                .then(response => {
                    resolve(response.map(r => createClubFromClubResponse(r)))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

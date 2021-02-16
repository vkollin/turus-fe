import {Repository} from "./Repository";
import {Postcode} from "../model/Postcode";
import {PostcodeSearchResponse} from "../type/api/postcode";
import {createPostcodeFromPostcodeSearchResponse} from "../factory/postcode";

export class PostcodeRepository extends Repository {

    search = (value: string): Promise<Postcode[]> => {
        const url = `/api/postcode/search/${value}`;

        return new Promise<Postcode[]>(((resolve, reject) => {
            this
                .get<PostcodeSearchResponse[]>(url)
                .then(response => {
                    resolve(response.map(r => createPostcodeFromPostcodeSearchResponse(r)))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

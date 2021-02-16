import {PostcodeSearchResponse} from "../type/api/postcode";
import {Postcode} from "../model/Postcode";

export const createPostcodeFromPostcodeSearchResponse = (code: PostcodeSearchResponse): Postcode => {
    return new Postcode(code);
}

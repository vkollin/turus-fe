import {Club} from "../model/Club";
import {ClubResponse} from "../type/api/club";
import {prefixWithApiUrl} from "../store/apiUrl";

export const createClubFromClubResponse = (response: ClubResponse): Club => {
    return new Club(response.id, response.name, response.icon ? prefixWithApiUrl(response.icon) : null);
}

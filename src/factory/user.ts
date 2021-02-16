import {User} from "../model/User";
import {UserResponse} from "../type/api/user";
import {createClubFromClubResponse} from "./club";
import {createPostcodeFromPostcodeSearchResponse} from "./postcode";

export const createUserFromUserResponse = (response: UserResponse): User => {
    const clubs = [];
    const enemies = [];
    const postcode = createPostcodeFromPostcodeSearchResponse(response.postcode);

    for (const rawClub of response.clubs) {
        clubs.push(createClubFromClubResponse(rawClub));
    }

    for (const rawClub of response.enemies) {
        enemies.push(createClubFromClubResponse(rawClub));
    }

    return new User(response.hash, postcode, clubs, enemies);
}

import {ClubResponse} from "./club";

export type GetClubAndPostcodeResponse = {
    club: ClubResponse | null,
    postcode: string | null,
};

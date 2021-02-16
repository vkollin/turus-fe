import {ClubResponse} from "./club";

export interface UserResponse {
    hash: string,
    postcode: string,
    clubs: ClubResponse[],
    enemies: ClubResponse[],
}

export interface UpdateUserRequest {
    hash: string,
    postcode: string | null,
    clubs: number[],
    enemies: number[],
}

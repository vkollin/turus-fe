import {ClubResponse} from "./club";

export type GetDataResponse = {
    polygon: null | {
        rings: [number, number][][]
    },
    postcode: string,
    name: string,
    results: {
        club: ClubResponse,
        count: number,
    }[],
};

import {ClubResponse} from "./club";

export type ShapeResponse = {
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

export enum Mode {
    STANDARD = 'standard',
    EXCLUSIVE = 'exclusive',
}

export type GetDataResponse = {
    shapes: ShapeResponse[],
    mode: Mode,
};

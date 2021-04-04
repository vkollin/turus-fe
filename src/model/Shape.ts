import {LatLng} from "./Bounds";
import {Club} from "./Club";

type Rings = LatLng[][];

export class Shape {
    constructor(
        readonly postcode: string,
        readonly name: string | null,
        readonly polygons: Polygon[],
        readonly results: Result[]
    ) {
    }
}

export class Polygon {
    constructor(
        readonly rings: Rings,
    ) {
    }
}

export class Result {
    constructor(readonly club: Club, readonly  count: number) {
    }
}

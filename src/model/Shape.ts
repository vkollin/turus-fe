import {LatLng} from "./Bounds";
import {Result} from "./Result";

type Rings = LatLng[][];

export class Shape {
    constructor(
        readonly postcode: string,
        readonly name: string | null,
        readonly polygons: Polygon[],
        readonly results: Result[]
    ) {
    }

    getFirstResult = (): Result => {
        return this.results[0];
    }
}

export class Polygon {
    constructor(
        readonly rings: Rings,
    ) {
    }
}

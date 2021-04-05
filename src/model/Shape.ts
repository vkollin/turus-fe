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

export class Result {
    constructor(readonly club: Club, readonly count: number, readonly total: number | null) {
    }

    get share(): number | null {
        if (this.total === null) {
            return null;
        }

        return this.count / this.total;
    }
}

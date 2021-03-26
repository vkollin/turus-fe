import {GetDataResponse} from "../type/api/map";
import {Polygon, Result, Shape} from "../model/Shape";
import {LatLng} from "../model/Bounds";
import {createClubFromClubResponse} from "./club";
import * as turf from '@turf/turf'
import {Position} from '@turf/turf'

const createPolygonFromResponse = (response: GetDataResponse): Polygon | null => {

    if (response.polygon === null) {
        return null;
    }

    const rings = response.polygon.rings;

    let union = null;

    for (const ring of rings) {
        if (union === null) {
            union = turf.polygon(ring)
            continue
        }

        union = turf.union(union, turf.polygon(ring))
    }

    if (union === null) {
        return null;
    }

    const unionCoordinates = union.geometry.coordinates as Position[][];

    return new Polygon(unionCoordinates.map(ring => ring.map(r => new LatLng(r[0], r[1]))));
};

const createResultsFromResponse = (response: GetDataResponse) => {
    return response.results.map((r) => new Result(createClubFromClubResponse(r.club), r.count));
};

export const createShapeFromResponse = (response: GetDataResponse): Shape => {

    const polygon = createPolygonFromResponse(response);
    const results = createResultsFromResponse(response);


    return new Shape(response.postcode, response.name, polygon, results);
}



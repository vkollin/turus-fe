import {GetDataResponse} from "../type/api/map";
import {Polygon, Result, Shape} from "../model/Shape";
import {LatLng} from "../model/Bounds";
import {createClubFromClubResponse} from "./club";
import * as turf from '@turf/turf'
import {Position} from '@turf/turf'

const createPolygonsFromResponse = (response: GetDataResponse): Polygon[] => {
    if (response.polygon === null) {
        return [];
    }

    const rings = response.polygon.rings;

    let union = null;

    for (const ring of rings) {
        if (union === null) {
            union = turf.polygon([ring])
            continue
        }

        union = turf.union(union, turf.polygon([ring]))
    }

    if (union === null) {
        return [];
    }

    let unionPolygons = union.geometry.coordinates as Position[][][] | Position[][];
    let preparedUnionPolygons = null;

    if (unionPolygons.length === 1) {
        preparedUnionPolygons = [unionPolygons] as Position[][][];
    } else {
        preparedUnionPolygons = unionPolygons as Position[][][];
    }

    return preparedUnionPolygons.map(
        polygon => new Polygon(
            polygon.map(
                ring => ring.map(
                    r => new LatLng(r[0], r[1])
                )
            )
        )
    );
};

const createResultsFromResponse = (response: GetDataResponse) => {
    return response.results.map((r) => new Result(createClubFromClubResponse(r.club), r.count));
};

export const createShapeFromResponse = (response: GetDataResponse): Shape => {
    const polygons = createPolygonsFromResponse(response);
    const results = createResultsFromResponse(response);

    return new Shape(response.postcode, response.name, polygons, results);
}



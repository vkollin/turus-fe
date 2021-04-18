import {ShapeResponse} from "../type/api/map";
import {Polygon, Shape} from "../model/Shape";
import {LatLng} from "../model/Bounds";
import * as turf from '@turf/turf'
import {Position} from '@turf/turf'
import {createResultsFromResponse} from "./result";

const createPolygonsFromResponse = (shapeResponse: ShapeResponse): Polygon[] => {
    if (shapeResponse.polygon === null) {
        return [];
    }

    const rings = shapeResponse.polygon.rings;

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
    let preparedUnionPolygons: Position[][][];

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

export const createShapeFromResponse = (shapeResponse: ShapeResponse): Shape => {
    const polygons = createPolygonsFromResponse(shapeResponse);
    const results = createResultsFromResponse(shapeResponse);

    return new Shape(shapeResponse.postcode, shapeResponse.name, polygons, results);
}



import {GetDataResponse} from "../type/api/map";
import {Polygon, Result, Shape} from "../model/Shape";
import {LatLng} from "../model/Bounds";
import {createClubFromClubResponse} from "./club";

const createPolygonFromResponse = (response: GetDataResponse) => {

    if (response.polygon === null) {
        return null;
    }

    return new Polygon(response.polygon.rings.map(ring => ring.map(r => new LatLng(r[0], r[1]))));
};

const createResultsFromResponse = (response: GetDataResponse) => {
    return response.results.map((r) => new Result(createClubFromClubResponse(r.club), r.count));
};

export const createShapeFromResponse = (response: GetDataResponse): Shape => {

    const polygon = createPolygonFromResponse(response);
    const results = createResultsFromResponse(response);


    return new Shape(response.postcode, response.name, polygon, results);
}



import {GetDataResponse} from "../type/api/map";
import {Polygon, Shape} from "../model/Shape";
import {LatLng} from "../model/Bounds";

const createPolygonFromResponse = (response: GetDataResponse) => {

    if (response.polygon === null) {
        return null;
    }

    return new Polygon(response.polygon.rings.map(ring => ring.map(r => new LatLng(r[0], r[1]))));
};

export const createShapeFromResponse = (response: GetDataResponse): Shape => {

    const polygon = createPolygonFromResponse(response);

    return new Shape(response.postcode, response.name, polygon);
}

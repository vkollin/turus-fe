import {Repository} from "./Repository";
import {Bounds} from "../model/Bounds";
import {GetDataResponse} from "../type/api/map";
import {createShapeFromResponse} from "../factory/shape";
import {Shape} from "../model/Shape";

export class MapRepository extends Repository {

    getShapesForBounds = (bounds: Bounds) => {
        const url = `/api/map/data/${bounds.northEast.toString()}/${bounds.southWest.toString()}`;

        return new Promise<Shape[]>(((resolve, reject) => {
            this
                .get<GetDataResponse[]>(url)
                .then(response => {
                    resolve(response.map(s => createShapeFromResponse(s)))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

import {QueryParamsType, Repository} from "./Repository";
import {Bounds} from "../model/Bounds";
import {GetDataResponse} from "../type/api/map";
import {createShapeFromResponse} from "../factory/shape";
import {Club} from "../model/Club";
import {MapResponse} from "../model/MapResponse";
import {AxiosRequestConfig} from "axios";

export class MapRepository extends Repository {

    getShapesForBounds = (bounds: Bounds, zoom = 1, club: Club | null, axiosOptions?: AxiosRequestConfig) => {
        let url = `/api/map/data/${bounds.northEast.toString()}/${bounds.southWest.toString()}/${zoom}`;
        const query: QueryParamsType = {};

        if (club) {
            query['club'] = `${club.id}`;
        }

        return new Promise<MapResponse>(((resolve, reject) => {
            this
                .get<GetDataResponse>(url, query, axiosOptions)
                .then(response => {
                    const shapes = response.shapes.map(s => createShapeFromResponse(s));

                    resolve(new MapResponse(shapes, response.mode))
                })
                .catch(err => {
                    reject(err);
                });
        }));
    }
}

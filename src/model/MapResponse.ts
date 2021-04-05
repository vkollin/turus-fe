import {MapMode} from "../type/api/map";
import {Shape} from "./Shape";

export class MapResponse {
    constructor(readonly shapes: Shape[], readonly mode: MapMode) {
    }
}

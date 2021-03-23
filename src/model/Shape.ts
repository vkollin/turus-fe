import {LatLng} from "./Bounds";
import {Map, Polygon as LeafletPolygon} from "leaflet";
import {Leaflet} from "../bridge/Leaflet";

export class Shape {
    leafletPolygon?: LeafletPolygon;

    constructor(
        readonly postcode: string,
        readonly name: string | null,
        readonly polygon: Polygon | null,
    ) {
    }

    addPolygonToMap = (map: Map) => {
        if (this.polygon !== null) {
            this.leafletPolygon = Leaflet.polygon(this.polygon.rings);

            this.leafletPolygon.addTo(map);
        }
    };

    removeFromMap = () => {
        if (this.leafletPolygon) {
            this.leafletPolygon.remove()
        }
    };
}

export class Polygon {
    constructor(
        readonly rings: LatLng[][],
    ) {
    }
}

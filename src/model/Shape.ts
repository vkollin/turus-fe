import {LatLng} from "./Bounds";
import {Map, Polygon as LeafletPolygon} from "leaflet";
import {Leaflet} from "../bridge/Leaflet";
import {Club} from "./Club";
import style from "../page/Map/LeafletMap.scss"

type Rings = LatLng[][];

export class Shape {
    leafletPolygon?: LeafletPolygon;

    constructor(
        readonly postcode: string,
        readonly name: string | null,
        readonly polygon: Polygon | null,
        readonly results: Result[]
    ) {
    }

    addPolygonToMap = (map: Map) => {
        // TODO: move to LeafletMap component
        if (this.polygon !== null) {
            this.leafletPolygon = Leaflet.polygon(this.polygon.rings, {
                stroke: false,
                fill: false,
                className: style.Polygon,
            });

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
        readonly rings: Rings,
    ) {
    }
}

export class Result {
    constructor(readonly club: Club, readonly  count: number) {
    }
}

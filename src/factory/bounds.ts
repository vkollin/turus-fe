import {LatLngBounds} from "leaflet";
import {Bounds, LatLng} from "../model/Bounds";

export const createBoundsFromLeafletBounds = (leafletBounds: LatLngBounds): Bounds => {
    const northEast = new LatLng(leafletBounds.getNorthEast().lat, leafletBounds.getNorthEast().lng);
    const southWest = new LatLng(leafletBounds.getSouthWest().lat, leafletBounds.getSouthWest().lng);

    return new Bounds(northEast, southWest);
}

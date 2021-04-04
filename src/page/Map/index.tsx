import React, {useState} from "react";
import {LeafletMap} from "./LeafletMap";
import {LatLngBounds} from "leaflet";
import {createBoundsFromLeafletBounds} from "../../factory/bounds";
import {useDispatch} from "react-redux";
import {fetchShapes} from "../../store/action/fetchShapes";
import {ThunkDispatchType} from "../../type/thunk";
import {Shape} from "../../model/Shape";

const mapLeafletZoomToZoom = (leafletZoom: number): number => {
    if (leafletZoom <= 6) {
        return 5;
    } else if (leafletZoom === 7) {
        return 4;
    } else if (leafletZoom === 8) {
        return 3;
    } else if (leafletZoom === 9) {
        return 2
    } else if (leafletZoom >= 10) {
        return 1
    }

    return 1;
}

export default (): JSX.Element => {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const dispatch = useDispatch<ThunkDispatchType>()

    const onMapChange = (leafletBounds: LatLngBounds, leafletZoom: number) => {
        const bounds = createBoundsFromLeafletBounds(leafletBounds);

        dispatch(fetchShapes(bounds, mapLeafletZoomToZoom(leafletZoom)))
            .then((shapes => {
                setShapes(shapes)
            }));
    }

    return <LeafletMap onChange={onMapChange} shapes={shapes}/>
}

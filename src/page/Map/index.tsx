import React, {useState} from "react";
import {LeafletMap} from "./LeafletMap";
import {LatLngBounds} from "leaflet";
import {createBoundsFromLeafletBounds} from "../../factory/bounds";
import {useDispatch} from "react-redux";
import {fetchShapes} from "../../store/action/fetchShapes";
import {ThunkDispatchType} from "../../type/thunk";
import {Shape} from "../../model/Shape";

export default (): JSX.Element => {
    const [shapes, setShapes] = useState<Shape[]>([]);
    const dispatch = useDispatch<ThunkDispatchType>()

    const onMapChange = (leafletBounds: LatLngBounds) => {
        const bounds = createBoundsFromLeafletBounds(leafletBounds);

        dispatch(fetchShapes(bounds)).then((shapes => {
            setShapes(shapes)
        }));
    }

    return <LeafletMap onChange={onMapChange} shapes={shapes}/>
}

import React, {useEffect, useRef, useState} from "react";
import {LeafletMap} from "./LeafletMap";
import {LatLngBounds} from "leaflet";
import {createBoundsFromLeafletBounds} from "../../factory/bounds";
import {useDispatch} from "react-redux";
import {fetchMapResponse} from "../../store/action/fetchMapResponse";
import {ThunkDispatchType} from "../../type/thunk";
import {Shape} from "../../model/Shape";
import s from "./index.scss";
import {PageLoader} from "../../component/PageLoader";
import {ClubSearch} from "../../component/ClubSearch";
import {Style} from "../../component/Select";
import {useMapState} from "../../hook/useMapState";
import {LatLng} from "../../model/Bounds";

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
    const [isLoading, setIsLoading] = useState(true);
    const [mapState, setBoundsAndZoom, setClub] = useMapState();

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(
            () => {
                setIsLoading(true);
            },
            300
        );

        if (mapState.bounds === null || mapState.zoom === null) {
            return
        }

        dispatch(fetchMapResponse(mapState.bounds, mapState.zoom, mapState.club))
            .then((mapResponse => {
                setShapes(mapResponse.shapes);
            }))
            .finally(() => {
                if (timeoutRef.current !== null) {
                    clearTimeout(timeoutRef.current);
                }

                setIsLoading(false);
            });

    }, [JSON.stringify(mapState)]);

    const onMapChange = (leafletBounds: LatLngBounds, leafletZoom: number) => {
        setBoundsAndZoom(
            createBoundsFromLeafletBounds(leafletBounds),
            mapLeafletZoomToZoom(leafletZoom)
        )
    }

    return <>
        {(isLoading) && <div className={s.LoadingOverlay}><PageLoader/></div>}

        <ClubSearch
            key={mapState.club?.id}
            style={Style.WHITE}
            className={s.ClubSearch}
            selectedClub={mapState.club}
            onSelect={(club => {
                setClub(club);
            })}
        />

        <LeafletMap
            initialCenter={new LatLng(51.1642292, 10.4541194)}
            initialZoom={6}
            onChange={onMapChange}
            shapes={shapes}
        />
    </>
}

import React, {useEffect, useRef, useState} from "react";
import s from './LeafletMap.scss';
import {Leaflet} from "../../bridge/Leaflet";
import {LatLngBounds, Map, Polygon, PolylineOptions} from "leaflet";
import {Shape} from "../../model/Shape";
import {LatLng} from "../../model/Bounds";
import {MapMode} from "../../type/api/map";
import {renderToString} from "react-dom/server";
import {PolygonTooltip} from "../../component/PolygonTooltip";
import {Color, pickColor} from "../../helper/pickColor";
import {PolygonExclusiveInfo} from "../../component/PolygonExclusiveInfo";

const STADIAMAPS_API_KEY = 'e1aff7e5-fb59-4d0e-a87f-fe6f5d8694cf';

const HeatmapGradient: Color[] = [
    [255, 0, 0],
    [0, 128, 0],
];

type Props = {
    initialCenter: LatLng,
    initialZoom: number,
    onChange: (bounds: LatLngBounds, zoom: number) => void,
    shapes: Shape[]
    mode: MapMode,
};

export const LeafletMap = (props: Props): JSX.Element => {
    const map = useRef<Map | null>(null)
    const [shapes, setShapes] = useState<Shape[]>([])
    const [polygons, setPolygons] = useState<Polygon[]>([])

    useEffect(() => {
        const leafletMap = Leaflet
            .map("mapId", {maxZoom: 18, minZoom: 2, zoomControl: false})
            .setView([props.initialCenter.lat, props.initialCenter.lng], props.initialZoom);

        leafletMap.on('moveend', () => {
            props.onChange(leafletMap.getBounds(), leafletMap.getZoom())
        })

        map.current = leafletMap;

        Leaflet.control.zoom({position: 'bottomright'}).addTo(map.current);

        Leaflet
            .tileLayer(`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${STADIAMAPS_API_KEY}`, {
                attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            })
            .addTo(map.current);

        props.onChange(leafletMap.getBounds(), leafletMap.getZoom())
    }, [])

    useEffect(() => {
        for (const polygon of polygons) {
            polygon.remove()
        }

        setShapes(props.shapes);
    }, [props.shapes]);

    useEffect(() => {
        if (map.current !== null) {
            const polygons = addShapesToMap(shapes, map.current, props.mode);

            setPolygons(polygons);
        }
    }, [shapes]);

    return <div id="mapId" className={s.Map}/>
}

const addShapesToMap = (shapes: Shape[], map: Map, mode: MapMode): Polygon[] => {
    const polygons = [];

    for (const shape of shapes) {
        for (const rawPolygon of shape.polygons) {
            let polylineOptions: PolylineOptions;

            let tooltipComponent: JSX.Element;

            switch (mode) {
                case MapMode.STANDARD:
                    tooltipComponent = <PolygonTooltip shape={shape}/>
                    polylineOptions = {
                        className: s.Polygon,
                        stroke: false,
                        fill: false,
                    };
                    break;
                case MapMode.EXCLUSIVE:
                    const share = shape.getFirstResult().share;
                    const heatColor = share !== null ? getHeatColorForShare(share) : undefined;

                    tooltipComponent = <PolygonExclusiveInfo shape={shape}/>
                    polylineOptions = {
                        stroke: share !== null,
                        color: heatColor,
                        fill: share !== null,
                        fillColor: heatColor,
                        className: share ? s.PolygonExclusive : s.Polygon,
                    }
                    break
            }

            const polygon = Leaflet.polygon(rawPolygon.rings, polylineOptions)
            polygon.bindTooltip(renderToString(tooltipComponent), {direction: "auto"})

            polygon.addTo(map);

            polygons.push(polygon);
        }
    }

    return polygons;
}

const getHeatColorForShare = (share: number): string => {
    const pickedColor = pickColor(HeatmapGradient[0], HeatmapGradient[1], share);

    return `rgb(${pickedColor[0]},${pickedColor[1]},${pickedColor[2]})`
}

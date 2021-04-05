import React, {useEffect, useRef, useState} from "react";
import s from './LeafletMap.scss';
import {Leaflet} from "../../bridge/Leaflet";
import {LatLngBounds, Map, Polygon} from "leaflet";
import {Shape} from "../../model/Shape";
import {PolygonTooltip} from "../../component/PolygonTooltip";
import {renderToString} from "react-dom/server";
import {LatLng} from "../../model/Bounds";

const STADIAMAPS_API_KEY = 'e1aff7e5-fb59-4d0e-a87f-fe6f5d8694cf';

type Props = {
    initialCenter: LatLng,
    initialZoom: number,
    onChange: (bounds: LatLngBounds, zoom: number) => void,
    shapes: Shape[]
};

export const LeafletMap = (props: Props): JSX.Element => {
    const map = useRef<Map | null>(null)
    const [shapes, setShapes] = useState<Shape[]>([])
    const [polygons, setPolygons] = useState<Polygon[]>([])

    useEffect(() => {
        const leafletMap = Leaflet.map("mapId").setView([props.initialCenter.lat, props.initialCenter.lng], props.initialZoom);

        leafletMap.on('moveend', () => {
            props.onChange(leafletMap.getBounds(), leafletMap.getZoom())
        })

        map.current = leafletMap;

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
            const polygons = addShapesToMap(shapes, map.current);

            setPolygons(polygons);
        }
    }, [shapes]);

    return <div id="mapId" className={s.Map}/>
}

const addShapesToMap = (shapes: Shape[], map: Map): Polygon[] => {
    const polygons = [];

    for (const shape of shapes) {
        for (const rawPolygon of shape.polygons) {

            const polygon = Leaflet.polygon(rawPolygon.rings, {
                stroke: false,
                fill: false,
                className: s.Polygon,
            })

            polygon.addTo(map);
            polygon.bindTooltip(renderToString(<PolygonTooltip shape={shape}/>))

            polygons.push(polygon);
        }
    }

    return polygons;
}


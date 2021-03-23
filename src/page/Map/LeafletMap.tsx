import React, {useEffect, useRef, useState} from "react";
import s from './LeafletMap.scss';
import {Leaflet} from "../../bridge/Leaflet";
import {LatLngBounds, Map} from "leaflet";
import {Shape} from "../../model/Shape";
import {PolygonTooltip} from "../../component/PolygonTooltip";
import {renderToString} from "react-dom/server";

export const LeafletMap = (props: { onChange: (bounds: LatLngBounds) => void, shapes: Shape[] }): JSX.Element => {
    const map = useRef<Map | null>(null)
    const [shapes, setShapes] = useState<Shape[]>([])

    useEffect(() => {
        const leafletMap = Leaflet.map("mapId").setView([51.1642292, 10.4541194], 6);

        leafletMap.on('moveend zoomend', () => {
            props.onChange(leafletMap.getBounds())
        })

        map.current = leafletMap;

        Leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
            })
            .addTo(map.current);

        props.onChange(leafletMap.getBounds())
    }, [])

    useEffect(() => {
        for (const shape of shapes) {
            shape.removeFromMap()
        }

        setShapes(props.shapes);
    }, [props.shapes]);

    useEffect(() => {
        if (map.current !== null) {
            for (const shape of shapes) {
                shape.addPolygonToMap(map.current);
                shape.leafletPolygon?.bindTooltip(renderToString(<PolygonTooltip shape={shape}/>))
            }
        }
    }, [shapes]);

    return <div id="mapId" className={s.Map}/>
}
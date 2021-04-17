import React from "react";
import s from "./Footer.scss";
// @ts-ignore
import logo from "/src/image/devultras.svg"

export const Footer = (props: { mapMode?: boolean }) => {
    return <footer className={[s.Footer, props.mapMode ? s.MapMode : null].join(' ')}>
        <div>
            <a href="https://devultras.com">
                <svg className={s.Logo}>
                    <use xlinkHref={`${logo}#logo`}/>
                </svg>
            </a>
        </div>
        {props.mapMode && <MapAttribution/>}
    </footer>
}

const MapAttribution = () => <div className={s.MapAttribution}>
    <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>
    &copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a
    href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a
    href="http://openstreetmap.org">OpenStreetMap</a> contributors
</div>;

import {useState} from "react";
import {Bounds} from "../model/Bounds";
import {Club} from "../model/Club";

type ReturnType = [
    { bounds: Bounds | null, zoom: number | null, club: Club | null },
    (bounds: Bounds, zoom: number) => void,
    (club: Club) => void,
];

export const useMapState = (initialBounds = null, initialZoom = null, initialClub = null): ReturnType => {
    const [boundsAndZoom, __setBoundsAndZoom] = useState<[Bounds | null, number | null]>([initialBounds, initialZoom]);
    const [club, setClub] = useState<Club | null>(initialClub);

    const setBoundsAndZoom = (b: Bounds, z: number): void => {
        __setBoundsAndZoom([b, z]);
    }

    return [{bounds: boundsAndZoom[0], zoom: boundsAndZoom[1], club: club}, setBoundsAndZoom, setClub];
}

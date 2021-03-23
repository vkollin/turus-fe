export class Bounds {
    constructor(
        readonly northEast: LatLng,
        readonly southWest: LatLng,
    ) {
    }
}

export class LatLng {
    constructor(readonly lat: number, readonly lng: number) {
    }

    toString = (): string => {
        return `${this.lat},${this.lng}`;
    }
}

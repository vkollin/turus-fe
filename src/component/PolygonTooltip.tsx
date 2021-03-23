import React from "react";
import {Shape} from "../model/Shape";

type PolygonTooltipProps = {
    shape: Shape
};

export const PolygonTooltip = (props: PolygonTooltipProps): JSX.Element => {

    const results = props.shape.results.map((r) => <div key={r.club.id}>{r.club.name} - {r.count}</div>);

    return <>
        <h1>{props.shape.postcode}</h1>
        {results}
    </>
}

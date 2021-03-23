import React from "react";
import {Shape} from "../model/Shape";

type PolygonTooltipProps = {
    shape: Shape
};

export const PolygonTooltip = (props: PolygonTooltipProps): JSX.Element => {
    return <>
        <h1>{props.shape.postcode}</h1>
    </>
}

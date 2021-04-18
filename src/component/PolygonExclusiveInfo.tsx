import React from "react";
import {Shape} from "../model/Shape";
import s from "./PolygonTooltip.scss";
import {DisplayService} from "../service/DisplayService";

type PolygonTooltipProps = {
    shape: Shape
};

export const PolygonExclusiveInfo = (props: PolygonTooltipProps): JSX.Element => {
    const result = props.shape.getFirstResult();

    return <div className={s.Wrapper}>
        <h1>{props.shape.postcode}</h1>
        {result.count} von {result.total} Stimmen gab es in diesem Gebiet.<br/>
        Das entspricht {result.share ? DisplayService.formatPercent(result.share) : ''}
    </div>
}

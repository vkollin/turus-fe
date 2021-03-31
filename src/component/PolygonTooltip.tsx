import React from "react";
import {Result, Shape} from "../model/Shape";
import s from "./PolygonTooltip.scss";

type PolygonTooltipProps = {
    shape: Shape
};

export const PolygonTooltip = (props: PolygonTooltipProps): JSX.Element => {

    return <div className={s.Wrapper}>
        <h1>{props.shape.postcode}</h1>
        <TooltipResults results={props.shape.results}/>
    </div>
}

const TooltipResults = (props: { results: Result[] }): JSX.Element => {
    const rows = [
        <div key={'header'} className={s.ResultsHeader}>
            <div className={s.ResultsCaption}>
                <div/>
                <div>Stimmen</div>
                <div>Klub</div>
            </div>
        </div>
    ];

    let previousCount = null;
    let ranking = 1;

    for (const result of props.results) {
        const hasDifferentCountAsPrevious = previousCount !== result.count;

        if (previousCount && hasDifferentCountAsPrevious) {
            ranking++;
        }

        const row = <div key={result.club.id} className={s.Result}>
            <div className={s.Ranking}>{hasDifferentCountAsPrevious && ranking}</div>
            <div className={s.Count}>{result.count}</div>
            <div className={s.Club}>{result.club.name}</div>
        </div>

        rows.push(row);

        previousCount = result.count
    }

    return <div className={s.Results}>{rows}</div>
}

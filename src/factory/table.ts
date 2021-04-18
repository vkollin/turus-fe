import {Cell, Column, DirectionEnum, Row, Table} from "../model/Table";
import {Results} from "../model/Results";
import {DisplayService} from "../service/DisplayService";

export const createPostcodeBasedFromResults = (result: Results): Table => {

    const columns = [
        new Column('ranking', 'Rang', {direction: DirectionEnum.LEFT}),
        new Column('club', 'Klub', {direction: DirectionEnum.LEFT}),
        new Column('count', 'Stimmen', {direction: DirectionEnum.RIGHT}),
        new Column('postcodeShare', 'Anteil (Gebiet)', {direction: DirectionEnum.RIGHT}),
        new Column('clubShare', 'Anteil (Klub)', {direction: DirectionEnum.RIGHT}),
    ];

    const rows: Row[] = [];

    let totalCount = 0;
    let previousCount = null;
    let ranking = 1;

    for (const r of result.results) {
        totalCount += r.count;
    }

    for (const r of result.results) {
        const hasDifferentCountAsPrevious = previousCount !== r.count;

        if (previousCount && hasDifferentCountAsPrevious) {
            ranking++;
        }

        const cells = [
            new Cell('ranking', `${ranking}.`),
            new Cell('club', r.club.name),
            new Cell('count', r.count),
            new Cell('postcodeShare', DisplayService.formatPercent(r.count / totalCount)),
            new Cell('clubShare', r.share ? DisplayService.formatPercent(r.share) : ''),
        ];

        rows.push(new Row(cells))

        previousCount = r.count
    }

    return new Table(result.postcode, columns, rows);
}

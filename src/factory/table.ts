import {Cell, Column, DirectionEnum, Row, Table} from "../model/Table";
import {Results} from "../model/Results";
import {DisplayService} from "../service/DisplayService";
import {Club} from "../model/Club";

export function createPostcodeBasedFromResults(results: Results): Table<Club> {

    const columns = [
        new Column('ranking', 'Rang', {direction: DirectionEnum.LEFT}),
        new Column('club', 'Klub', {direction: DirectionEnum.LEFT}),
        new Column('count', 'Stimmen', {direction: DirectionEnum.RIGHT}),
        new Column('postcodeShare', 'Anteil (Gebiet)', {direction: DirectionEnum.RIGHT}),
        new Column('clubShare', 'Anteil (Klub)', {direction: DirectionEnum.RIGHT}),
    ];

    const rows: Row<Club>[] = [];

    let totalCount = 0;
    let previousCount = null;
    let ranking = 1;

    for (const r of results.results) {
        totalCount += r.count;
    }

    for (const r of results.results) {
        const hasDifferentCountAsPrevious = previousCount !== r.count;

        if (previousCount && hasDifferentCountAsPrevious) {
            ranking++;
        }

        const cells = [
            new Cell('ranking', `${ranking}.`),
            new Cell('club', r.club.name, {link: true}),
            new Cell('count', r.count),
            new Cell('postcodeShare', DisplayService.formatPercent(r.count / totalCount)),
            new Cell('clubShare', r.share ? DisplayService.formatPercent(r.share) : ''),
        ];

        rows.push(new Row<Club>(cells, r.club))

        previousCount = r.count
    }

    return new Table(results.postcode, columns, rows);
}

export function createClubBasedFromResults(results: Results[], club: Club): Table<string> {
    const columns = [
        new Column('postcode', 'PLZ', {direction: DirectionEnum.LEFT}),
        new Column('postcodeShare', 'Anteil (Gebiet)', {direction: DirectionEnum.RIGHT}),
        new Column('count', 'Stimmen', {direction: DirectionEnum.RIGHT}),
        new Column('clubShare', 'Anteil (Klub)', {direction: DirectionEnum.RIGHT}),
    ];

    const rows: Row<string>[] = [];

    for (const result of results) {

        const postcode = result.postcode;
        const r = result.results.filter((a) => a.club.id === club.id)[0];
        let totalCount = 0;

        for (const r of result.results) {
            totalCount += r.count;
        }
        const cells = [
            new Cell('postcode', postcode, {link: true}),
            new Cell('postcodeShare', DisplayService.formatPercent(r.count / totalCount)),
            new Cell('count', r.count),
            new Cell('clubShare', r.share ? DisplayService.formatPercent(r.share) : ''),
        ];

        rows.push(new Row<string>(cells, postcode));

    }

    return new Table(club.name, columns, rows);
}

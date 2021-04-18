import React from "react";
import {Column, DirectionEnum, Table as TableModel} from "../model/Table";
import s from "./Table.scss";

export const Table = (props: { table: TableModel }): JSX.Element => {

    const onColumnClick = (column: Column) => {
    };

    return <div className={s.Wrapper}>
        <h1>{props.table.title}</h1>
        <table className={s.Table}>
            <Header columns={props.table.columns} onClick={onColumnClick}/>
            <Body table={props.table}/>
        </table>
    </div>
}

const Header = (props: { columns: Column[], onClick: (column: Column) => void }): JSX.Element => {
    const renderedColumns: JSX.Element[] = [];

    for (const column of props.columns) {
        renderedColumns.push(<th
            className={[mapDirectionEnumToClassName(column.direction)].join(' ')}
            key={column.name}
            onClick={() => {
                props.onClick(column)
            }}>
            {column.displayName}
        </th>)
    }

    return <thead className={s.Head}>
    <tr>
        {renderedColumns}
    </tr>
    </thead>
}

const Body = (props: { table: TableModel }): JSX.Element => {
    const renderedRows: JSX.Element[] = [];

    for (const row of props.table.rows) {
        const renderedCells: JSX.Element[] = []
        const cellMapping = row.getMapping();

        for (const column of props.table.columns) {
            const cell = cellMapping[column.name] ?? null

            const value = cell ? `${cell.value}` : '';

            renderedCells.push(<td
                key={column.name}
                className={[mapDirectionEnumToClassName(column.direction)].join(' ')}
            >
                {value}
            </td>)
        }

        renderedRows.push(<tr key={JSON.stringify(row)}>{renderedCells}</tr>)
    }

    return <tbody className={s.Body}>{renderedRows}</tbody>
}

function mapDirectionEnumToClassName(direction: DirectionEnum): string {
    switch (direction) {
        case DirectionEnum.LEFT:
            return s.Left;
        case DirectionEnum.CENTER:
            return s.Center;
        case DirectionEnum.RIGHT:
            return s.Right;
    }
}

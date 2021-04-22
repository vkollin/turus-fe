import React from "react";
import {Column, DirectionEnum, Row, Table as TableModel} from "../model/Table";
import s from "./Table.scss";

type Props<T> = { table: TableModel<T>, onClick?: (data: T) => void };

export function Table<T>(props: Props<T>): JSX.Element {

    const onColumnClick = (column: Column) => {
        console.log(column)
    };

    const onRowClick = (row: Row<T>) => {
        if (typeof props.onClick === "function") {
            props.onClick(row.data)
        }
    };

    return <div className={s.Wrapper}>
        <h1>{props.table.title}</h1>
        <table className={s.Table}>
            <Header columns={props.table.columns} onClick={onColumnClick}/>
            <Body table={props.table} onClick={onRowClick}/>
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

function Body<T>(props: { table: TableModel<T>, onClick: (row: Row<T>) => void }): JSX.Element {
    const renderedRows: JSX.Element[] = [];

    for (const row of props.table.rows) {
        const renderedCells: JSX.Element[] = []
        const cellMapping = row.getMapping();

        for (const column of props.table.columns) {
            const cell = cellMapping[column.name] ?? null

            const classNames = [mapDirectionEnumToClassName(column.direction)];

            const value = cell ? `${cell.value}` : '';

            if (cell) {
                if (cell.options?.link) {
                    classNames.push(s.Link);
                }
            }

            renderedCells.push(<td
                key={column.name}
                className={classNames.join(' ')}
            >
                {value}
            </td>)
        }

        renderedRows.push(<tr key={JSON.stringify(row)} onClick={() => {
            props.onClick(row)
        }}>{renderedCells}</tr>)
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

type RowMapping = {
    [columnName: string]: Cell,
}

interface ColumnOptions {
    direction: DirectionEnum,
}

interface CellOptions {
    link?: boolean,
}

export enum DirectionEnum {
    LEFT,
    CENTER,
    RIGHT,
}

export class Table<T> {
    constructor(readonly title: string, readonly columns: Column[], readonly rows: Row<T>[]) {
    }
}

export class Column {
    constructor(readonly name: string, readonly displayName: string, readonly options: ColumnOptions | null = null) {
    }

    get direction(): DirectionEnum {
        return this.options?.direction ?? DirectionEnum.LEFT;
    }
}

export class Row<T> {
    constructor(readonly cells: Cell[], readonly data: T) {
    }

    getMapping = (): RowMapping => {
        const mapping: RowMapping = {};

        for (const cell of this.cells) {
            mapping[cell.column] = cell;
        }

        return mapping
    };
}

export class Cell {
    constructor(readonly column: string, readonly value: string | number | JSX.Element, readonly options: CellOptions | null = null) {
    }
}

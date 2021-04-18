type RowMapping = {
    [columnName: string]: Cell,
}

interface ColumnOptions {
    direction: DirectionEnum,
}

export enum DirectionEnum {
    LEFT,
    CENTER,
    RIGHT,
}

export class Table {
    constructor(readonly title: string, readonly columns: Column[], readonly rows: Row[]) {
    }
}

export class Column {
    constructor(readonly name: string, readonly displayName: string, readonly options: ColumnOptions | null = null) {
    }

    get direction(): DirectionEnum {
        return this.options?.direction ?? DirectionEnum.LEFT;
    }
}

export class Row {
    constructor(readonly cells: Cell[]) {
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
    constructor(readonly column: string, readonly value: string | number | JSX.Element) {
    }
}

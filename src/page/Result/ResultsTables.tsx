import React from "react";
import {Results} from "../../model/Results";
import {Table} from "../../component/Table";
import {createPostcodeBasedFromResults} from "../../factory/table";

export const ResultsTables = (props: { results: Results[] }): JSX.Element => {
    const tables: JSX.Element[] = [];

    for (const result of props.results) {
        const table = createPostcodeBasedFromResults(result);

        tables.push(<Table key={JSON.stringify(table)} table={table}/>);
    }

    return <>{tables}</>;
}


import React from "react";
import {Results} from "../../model/Results";
import {Table} from "../../component/Table";
import {createClubBasedFromResults, createPostcodeBasedFromResults} from "../../factory/table";
import {Club} from "../../model/Club";

export const ClubsTable = (props: { results: Results[], onClick?: (data: Club) => void }): JSX.Element => {
    const tables: JSX.Element[] = [];

    for (const result of props.results) {
        const table = createPostcodeBasedFromResults(result);

        tables.push(
            <Table<Club>
                key={JSON.stringify(table)}
                table={table}
            />
        );
    }

    return <>{tables}</>;
}

export const PostcodesTable = (props: { results: Results[], onClick?: (data: string) => void, club: Club }): JSX.Element => {
    const table = createClubBasedFromResults(props.results, props.club);

    return <Table<string>
        key={JSON.stringify(table)}
        table={table}
    />
}


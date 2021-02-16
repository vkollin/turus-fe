import React from "react";
import {Club} from "../../model/Club";
import {PageContent} from "../../component/PageContent";
import {ClubMultiSelect} from "./ClubMultiselect";

export const EnemyInterview = (props: { onSubmit: ((clubs: Club[]) => void), clubs: Club[] }) => {
    return <PageContent>
        <h1>Hass-Vereine</h1>

        <ClubMultiSelect selectedClubs={props.clubs} onSubmit={props.onSubmit}/>
    </PageContent>
}

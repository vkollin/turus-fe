import React from "react";
import {Club} from "../../model/Club";
import {PageContent} from "../../component/PageContent";
import {ClubMultiSelect} from "./ClubMultiselect";

export const ClubInterview = (props: { onSubmit: ((clubs: Club[]) => void), clubs: Club[] }) => {
    return <PageContent>
        <h1>Club Auswahl</h1>

        <ClubMultiSelect selectedClubs={props.clubs} onSubmit={props.onSubmit}/>
    </PageContent>
}

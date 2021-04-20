import React from "react";
import {Club} from "../../model/Club";
import {Section} from "../../component/Section";
import {ClubMultiSelect} from "./ClubMultiselect";

export const ClubInterview = (props: { onSubmit: ((clubs: Club[]) => void), clubs: Club[], selectedClassName?: string }) => {
    return <Section title={'Dein Verein'}>
        <ClubMultiSelect
            selectedClubs={props.clubs}
            onSubmit={props.onSubmit}
            selectedClassName={props.selectedClassName}
        />
    </Section>
}

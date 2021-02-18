import React from "react";
import {Section} from "../../component/Section";
import {PageContent} from "../../component/PageContent";
import s from "./ThankYou.scss";


export const ThankYou = (props: { onBack: () => void }) => {
    return <>
        <Section title={'Danke!'}>
            <p>Vielen Dank für deine Teilnahme.</p>
        </Section>
        <PageContent className={s.ButtonWrapper}>
            <span
                className={s.BackButton}
                onClick={() => {
                    props.onBack()
                }}
            >
                Zurück
            </span>
        </PageContent>
    </>
}

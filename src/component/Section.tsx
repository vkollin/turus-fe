import React from "react";
import {PageContent} from "./PageContent";
import s from './Section.scss';

export const Section: React.FC<{ title: string }> = (props): JSX.Element => {
    return <PageContent className={s.Section}>
        <h1>{props.title}</h1>
        {props.children}
    </PageContent>
}

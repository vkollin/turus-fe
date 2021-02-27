import React from "react";
import {Link} from "react-router-dom";
import {PageContent} from "../../component/PageContent";
import {Routes} from "../../type/routes";
import s from './index.scss';

export default (): JSX.Element => {
    return <PageContent>
        <h1>Umfrage</h1>
        <p>[Platzhalter]</p>
        <Link className={s.Button} to={Routes.FAN_LOCATION_INTERVIEW}>Zur Umfrage</Link>
    </PageContent>
}

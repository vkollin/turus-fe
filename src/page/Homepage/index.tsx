import React from "react";
import {Link} from "react-router-dom";
import {PageContent} from "../../component/PageContent";
import {Routes} from "../../type/routes";
import s from './index.scss';

export default (): JSX.Element => {
    return <PageContent>
        <h1>Umfrage</h1>

        <div className={s.ButtonWrapper}>
            <Link className={s.Button} to={Routes.FAN_LOCATION_INTERVIEW}>Direkt zur Umfrage … </Link>
        </div>

        <p><i>… oder noch ein bisschen lesen</i></p>

        <p>Wir haben diese Umfrage gebaut, um auf einer Karte darzustellen in welche Regionen (nach Postleitzahl
            gruppiert) es Fans von verschiedenen Klubs verschlagen hat.</p>

        <p>Es gibt ähnliche Karten bei diversen regionalen Tageszeitungen zu Vereinsmitgliedern von großen Klubs. Jedoch
            keine einzelne Karte mit allen. Zudem sind kleinere Klubs nie vertreten und auch nicht jeder ist
            Vereinsmitglied.</p>

        <p>Hier wollen wir versuchen, eine Karte zu erstellen, auf der sich alle Klubs wiederfinden.</p>

        <p>Zusätzlich könnt ihr auch eure Hassvereine angeben (der ein oder andere hat da ja bestimmt ein paar 😉). Die
            Ergebnisse hierzu werden später auch grafisch aufbereitet.</p>

        <p>Ein erster Entwurf der Karte mit Ergebnissen ist <Link to={Routes.MAP}>hier</Link> zu sehen</p>

        <p>Wir sind schon super gespannt und freuen uns auf eure rege Teilnahme!</p>

        <p>Danke!</p>

        <p>
            <i>
                PS: Wir haben versucht jeden Klub bis in die unteren Ligen mit aufzunehmen. Da das ziemlich viele sind
                (so an die 15.00!), verzeiht uns bitte, wenn einzelne fehlen sollten. Aus diesem Grund sind auch nur
                deutsche Klubs vertreten. <br/>Solltet ihr euren Klub nicht in der Liste finden, würden wir uns freuen,
                wenn ihr euch <a href="mailto:turus@devultras.com">meldet</a>. Wir werden anschließend den Klub mit
                aufnehmen.
            </i>
        </p>

        <div className={s.ButtonWrapper}>
            <Link className={s.Button} to={Routes.FAN_LOCATION_INTERVIEW}>Zur Umfrage</Link>
        </div>

    </PageContent>
}

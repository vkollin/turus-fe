import React from "react";
import s from "./PageLoader.scss";

export const PageLoader = (): JSX.Element => {
    return <div className={s.PageLoader}>
        <div className={s.Loader}/>
    </div>
}

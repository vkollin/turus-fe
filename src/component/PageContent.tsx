import React from "react";
import style from "./PageContent.scss";

export const PageContent: React.FC = (props) => {
    return <div className={style.PageContent}>{props.children}</div>
}

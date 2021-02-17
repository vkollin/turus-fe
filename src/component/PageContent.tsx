import React from "react";
import style from "./PageContent.scss";

export const PageContent: React.FC<{ className?: string }> = (props) => {
    return <div className={[style.PageContent, props.className].join(' ')}>
        {props.children}
    </div>
}

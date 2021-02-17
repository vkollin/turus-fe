import React from "react";
import style from "./PageWrapper.scss";

export const PageWrapper: React.FC<{ className?: string }> = (props) => {
    return <div className={[style.Wrapper, props.className].join(' ')}>
        {props.children}
    </div>
}

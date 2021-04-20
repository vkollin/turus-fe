import React from "react";
import s from "./SelectedValue.scss";


export const SelectedValue = (props: { src?: string | null, label: string, onClick?: () => void, className?: string }) => {
    let image = null;
    const hasOnClick = typeof props.onClick !== 'undefined';
    let onClick = () => {
    };

    if (hasOnClick) {
        onClick = props.onClick as () => void
    }

    if (props.src) {
        image = <div className={s.Image}><img src={props.src} alt={props.src}/></div>
    }

    return <div
        className={[s.Wrapper, props.className].join(' ')}
        onClick={onClick}
    >
        {image}
        <div className={s.Label}>{props.label}</div>
        {hasOnClick && <span className={s.Icon}/>}
    </div>
}

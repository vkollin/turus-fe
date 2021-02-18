import React from "react";
import s from "./Footer.scss";
// @ts-ignore
import logo from "/src/image/devultras.svg"

export const Footer = () => {
    return <footer className={s.Footer}>
        <div>
            <a href="https://devultras.com">
                <svg className={s.Logo}>
                    <use xlinkHref={`${logo}#logo`}/>
                </svg>
            </a>
        </div>
    </footer>
}
